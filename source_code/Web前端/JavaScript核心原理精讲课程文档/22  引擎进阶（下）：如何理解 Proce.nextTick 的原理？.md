<p data-nodeid="665" class="">上一讲我们讨论了宏任务和微任务的运行机制和原理，我在最后提到了 Process.nextTick 是微任务的其中一个，那么这一讲我们就来深挖一下 Process.nextTick 的相关知识。</p>
<p data-nodeid="666">这一讲我除了结合上一讲说的究宏任务和微任务的运行机制外，还将通过一些代码片段来带你研究 Process.nextick 的执行逻辑，帮你把这块知识点重新梳理。在日常开发中，Process.nextick 在浏览器端代码中很少使用，但在 Node.js 开发种却极为常见，所以你要好好掌握。</p>
<p data-nodeid="667">那么，为了方便你更好地理解本讲的内容，在课程开始前请你先思考：</p>
<ol data-nodeid="668">
<li data-nodeid="669">
<p data-nodeid="670">Process.nextick 和其他微任务方法在一起的时候，执行顺序是怎么样的？</p>
</li>
<li data-nodeid="671">
<p data-nodeid="672">Vue 也有个 nextick，它的逻辑又是什么样的？</p>
</li>
</ol>
<p data-nodeid="673">带着疑问，我们先来了解一下 Process.nextick。</p>
<h3 data-nodeid="674">基本语法</h3>
<p data-nodeid="675">Process.nextick 的语法有两个参数：</p>
<blockquote data-nodeid="676">
<p data-nodeid="677">process.nextTick(callback[, ...args])</p>
</blockquote>
<p data-nodeid="678">其中，第一个参数是 callback 回调函数，第二个参数是 args 调用 callback 时额外传的参数，是可选参数。</p>
<p data-nodeid="679">再来看下 Process.nextick 的运行逻辑：</p>
<ol data-nodeid="680">
<li data-nodeid="681">
<p data-nodeid="682">Process.nextick 会将 callback 添加到“next tick queue”；</p>
</li>
<li data-nodeid="683">
<p data-nodeid="684">“next tick queue”会在当前 JavaScript stack 执行完成后，下一次 event loop 开始执行前按照 FIFO 出队；</p>
</li>
<li data-nodeid="685">
<p data-nodeid="686">如果递归调用 Process.nextick 可能会导致一个无限循环，需要去适时终止递归。</p>
</li>
</ol>
<p data-nodeid="687">可能你已经注意到 Process.nextick 其实是微任务，同时也是异步 API 的一部分。但是从技术上来说 Process.nextick 并不是事件循环（eventloop）的一部分，相反地，“next tick queue”将会在当前操作完成之后立即被处理，而不管当前处于事件循环的哪个阶段。</p>
<p data-nodeid="688">思考一下上面的逻辑，如果任何时刻你在一个给定的阶段调用 Process.nextick，则所有被传入 Process.nextick 的回调将在事件循环继续往下执行前被执行。这可能会导致一些很糟的情形，因为它允许用户递归调用 Process.nextick 来挂起 I/O 进程的进行，这会导致事件循环永远无法到达轮询阶段。</p>
<h3 data-nodeid="689">为什么使用 Process.nextTick()</h3>
<p data-nodeid="690">那么为什么 Process.nextick 这样的 API 会被允许出现在 Node.js 中呢？一部分原因是设计理念，Node.js 中的 API 应该总是异步的，即使是那些不需要异步的地方。下面的代码片段展示了一个例子：</p>
<pre class="lang-javascript" data-nodeid="691"><code data-language="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">apiCall</span>(<span class="hljs-params">arg, callback</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> arg !== <span class="hljs-string">'string'</span>)
  <span class="hljs-keyword">return</span> process.nextTick(callback, <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">'argument should be     string'</span>));
}
</code></pre>
<p data-nodeid="692">通过上面的代码检查参数，如果检查不通过，它将一个错误对象传给回调。Node.js API 最近进行了更新，其已经允许向 Process.nextick 中传递参数来作为回调函数的参数，而不必写嵌套函数。</p>
<p data-nodeid="693">我们所做的就是将一个错误传递给用户，但这只允许在用户代码被执行完毕后执行。使用 Process.nextick 我们可以保证 apicall() 的回调总是在用户代码被执行后，且在事件循环继续工作前被执行。为了达到这一点，JS 调用栈被允许展开，然后立即执行所提供的回调。该回调允许用户对 Process.nextick 进行递归调用，而不会达到 RangeError，即 V8 调用栈的最大值。</p>
<p data-nodeid="694">这种设计理念会导致一些潜在的问题，观察下面的代码片段：</p>
<pre class="lang-javascript" data-nodeid="695"><code data-language="javascript"><span class="hljs-keyword">let</span> bar;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">someAsyncApiCall</span>(<span class="hljs-params">callback</span>) </span>{ callback(); }
someAsyncApiCall(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'bar'</span>, bar);   <span class="hljs-comment">// undefined</span>
});
bar = <span class="hljs-number">1</span>;
</code></pre>
<p data-nodeid="696">用户定义函数 someAsyncApiCall() 有一个异步签名，但实际上它是同步执行的。当它被调用时，提供给 someAsyncApiCall() 的回调函数会在执行 someAsyncApiCall() 本身的同一个事件循环阶段被执行，因为 someAsyncApiCall() 实际上并未执行任何异步操作。结果就是，即使回调函数尝试引用变量 bar，但此时在作用域中并没有改变量。因为程序还没运行到对 bar 赋值的部分。</p>
<p data-nodeid="697">将回调放到 Process.nextick 中，程序依然可以执行完毕，且所有的变量、函数等都在执行回调之前被初始化，它还具有不会被事件循环打断的优点。以下是将上面的例子改用 Process.nextick 的代码：</p>
<pre class="lang-javascript" data-nodeid="698"><code data-language="javascript"><span class="hljs-keyword">let</span> bar;
&nbsp;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">someAsyncApiCall</span>(<span class="hljs-params">callback</span>) </span>{
  process.nextTick(callback);
}
&nbsp;
someAsyncApiCall(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'bar'</span>, bar); <span class="hljs-comment">// 1</span>
});
&nbsp;
bar = <span class="hljs-number">1</span>;
</code></pre>
<p data-nodeid="699">通过这个例子，你就可以体会到 Process.nextick 的作用了。其实在日常的 Node.js 开发中，这样的情况也经常会遇见，之前在“<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=601#/detail/pc?id=6189&amp;fileGuid=xxQTRXtVcqtHK6j8" data-nodeid="789">16 | 进阶练习（上）：怎样轻松实现一个 EventEmitter</a>”中我有讲过 EventEmitter，那么我们看下 EventEmitter 在 Node.js 的使用的一个例子。</p>
<p data-nodeid="700">因为 Node.js 直接有 event 模块，其实就是一个 EventEmitter，下面代码是在造函数中触发一个事件：</p>
<pre class="lang-javascript" data-nodeid="701"><code data-language="javascript"><span class="hljs-keyword">const</span> EventEmitter = <span class="hljs-built_in">require</span>(<span class="hljs-string">'events'</span>);
<span class="hljs-keyword">const</span> util = <span class="hljs-built_in">require</span>(<span class="hljs-string">'util'</span>);
&nbsp;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyEmitter</span>(<span class="hljs-params"></span>) </span>{
EventEmitter.call(<span class="hljs-keyword">this</span>);
<span class="hljs-keyword">this</span>.emit(<span class="hljs-string">'event'</span>);
}
util.inherits(MyEmitter, EventEmitter);
&nbsp;
<span class="hljs-keyword">const</span> myEmitter = <span class="hljs-keyword">new</span> MyEmitter();
myEmitter.on(<span class="hljs-string">'event'</span>, () =&gt; {
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'an event occurred!'</span>);
});
</code></pre>
<p data-nodeid="702">你无法在构造函数中立即触发一个事件，因为此时程序还未运行到将回调赋值给事件的那段代码。因此，在构造函数内部，你可以使用 Process.nextick 设置一个回调以在构造函数执行完毕后触发事件，下面的代码满足了我们的预期。</p>
<pre class="lang-javascript" data-nodeid="703"><code data-language="javascript"><span class="hljs-keyword">const</span> EventEmitter = <span class="hljs-built_in">require</span>(<span class="hljs-string">'events'</span>);
<span class="hljs-keyword">const</span> util = <span class="hljs-built_in">require</span>(<span class="hljs-string">'util'</span>);
&nbsp;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyEmitter</span>(<span class="hljs-params"></span>) </span>{
EventEmitter.call(<span class="hljs-keyword">this</span>);
process.nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">this</span>.emit(<span class="hljs-string">'event'</span>);
});
}
util.inherits(MyEmitter, EventEmitter);
&nbsp;
<span class="hljs-keyword">const</span> myEmitter = <span class="hljs-keyword">new</span> MyEmitter();
  myEmitter.on(<span class="hljs-string">'event'</span>, () =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'an event occurred!'</span>);
});
</code></pre>
<p data-nodeid="704">通过上面的改造可以看出，使用 Process.nextick 就可以解决问题了，即使 event 事件还没进行绑定，但也可以让代码在前面进行触发，因为根据代码执行顺序，Process.nextick 是在每一次的事件循环最后执行的。因此这样写，代码也不会报错，同样又保持了代码的逻辑。</p>
<p data-nodeid="705">通过这两个例子你应该对 Process.nextick 这个知识有了更好的理解了吧？下面我们再来看看浏览器端 Vue 框架的 nextick 是干什么用的，注意不要将二者混淆了，前面讲的是 Node.js 服务端的事情，而下面要说的是浏览器端 Vue 框架的知识。</p>
<h3 data-nodeid="706">Vue 的 nextick 又是什么意思？</h3>
<p data-nodeid="707">我们看下 Vue 官网最直白的解释：</p>
<blockquote data-nodeid="708">
<p data-nodeid="709">Vue 异步执行 DOM 的更新。当数据发生变化时，Vue 会开启一个队列，用于缓冲在同一事件循环中发生的所有数据改变的情况。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作上非常重要。然后在下一个的事件循环“tick”中。例如：当你设置 vm.someData = 'new value'，该组件不会立即重新渲染。当刷新队列时，组件会在事件循环队列清空时的下一个“tick”更新。多数情况我们不需要关心这个过程，但是如果你想在 DOM 状态更新后做点什么，这就可能会有些棘手。</p>
</blockquote>
<p data-nodeid="710">我们细细地根据 Vue 的官网理解一下，其实是不是有点像 EventLoop 的味道，这里只不过是 Vue 开启了一个队列，当你在 nextick 方法中改变数据的时候，视图层不会立马更新，而是要在下次的时间循环队列中更新。</p>
<p data-nodeid="711">这点是不是类似上面讲的 Node.js 的 Process.nextick 的意思？虽然运行的环境不一样，但是这个意思你可以细细品味一下。这里我们再来看一段 Vue 代码，让你理解 Vue 的 nextick 的作用。</p>
<pre class="lang-xml" data-nodeid="712"><code data-language="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"msg"</span>&gt;</span>{{msg}}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"msg1"</span>&gt;</span>Message got outside $nextTick: {{msg1}}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"msg2"</span>&gt;</span>Message got inside $nextTick: {{msg2}}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"changeMsg"</span>&gt;</span>
      Change the Message
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'.app'</span>,
  <span class="hljs-attr">data</span>: {
    <span class="hljs-attr">msg</span>: <span class="hljs-string">'Vue'</span>,
    <span class="hljs-attr">msg1</span>: <span class="hljs-string">''</span>,
    <span class="hljs-attr">msg2</span>: <span class="hljs-string">''</span>,
  },
  <span class="hljs-attr">methods</span>: {
    changeMsg() {
      <span class="hljs-keyword">this</span>.msg = <span class="hljs-string">"Hello world."</span>
      <span class="hljs-keyword">this</span>.msg1 = <span class="hljs-keyword">this</span>.$refs.msg.innerHTML
      <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">this</span>.msg2 = <span class="hljs-keyword">this</span>.$refs.msg.innerHTML
      })
    }
  }
})
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p data-nodeid="713">你可以将这一段代码放到自己的 Vue 的项目里执行一下，看看通过按钮点击之后，div 里面的 msg1 和 msg2 的变化情况。你会发现第一次点击按钮调用 changeMsg 方法时，其实 msg2 并没有变化，因为 msg2 的变化是在下一个 tick 才进行执行的。</p>
<p data-nodeid="714">最后我们再来看下 Vue 中 nextick 的源码。在 Vue 2.5+ 之后的版本中，有一个单独的 JS 文件来维护，路径是在 src/core/util/next-tick.js 中，源码如下：</p>
<pre class="lang-javascript" data-nodeid="715"><code data-language="javascript"><span class="hljs-comment">/* @flow */</span>
	<span class="hljs-comment">/* globals MutationObserver */</span>
	
	<span class="hljs-keyword">import</span> { noop } <span class="hljs-keyword">from</span> <span class="hljs-string">'shared/util'</span>
	<span class="hljs-keyword">import</span> { handleError } <span class="hljs-keyword">from</span> <span class="hljs-string">'./error'</span>
	<span class="hljs-keyword">import</span> { isIE, isIOS, isNative } <span class="hljs-keyword">from</span> <span class="hljs-string">'./env'</span>
	
	<span class="hljs-keyword">export</span> <span class="hljs-keyword">let</span> isUsingMicroTask = <span class="hljs-literal">false</span>
	
	<span class="hljs-keyword">const</span> callbacks = []
	<span class="hljs-keyword">let</span> pending = <span class="hljs-literal">false</span>
	
	<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">flushCallbacks</span> (<span class="hljs-params"></span>) </span>{
	  pending = <span class="hljs-literal">false</span>
	  <span class="hljs-keyword">const</span> copies = callbacks.slice(<span class="hljs-number">0</span>)
	  callbacks.length = <span class="hljs-number">0</span>
	  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; copies.length; i++) {
	    copies[i]()
	  }
	}
	
	<span class="hljs-comment">// Here we have async deferring wrappers using microtasks.</span>
	<span class="hljs-comment">// In 2.5 we used (macro) tasks (in combination with microtasks).</span>
	<span class="hljs-comment">// However, it has subtle problems when state is changed right before repaint</span>
	<span class="hljs-comment">// (e.g. #6813, out-in transitions).</span>
	<span class="hljs-comment">// Also, using (macro) tasks in event handler would cause some weird behaviors</span>
	<span class="hljs-comment">// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).</span>
	<span class="hljs-comment">// So we now use microtasks everywhere, again.</span>
	<span class="hljs-comment">// A major drawback of this tradeoff is that there are some scenarios</span>
	<span class="hljs-comment">// where microtasks have too high a priority and fire in between supposedly</span>
	<span class="hljs-comment">// sequential events (e.g. #4521, #6690, which have workarounds)</span>
	<span class="hljs-comment">// or even between bubbling of the same event (#6566).</span>
	<span class="hljs-keyword">let</span> timerFunc
	
	<span class="hljs-comment">// The nextTick behavior leverages the microtask queue, which can be accessed</span>
	<span class="hljs-comment">// via either native Promise.then or MutationObserver.</span>
	<span class="hljs-comment">// MutationObserver has wider support, however it is seriously bugged in</span>
	<span class="hljs-comment">// UIWebView in iOS &gt;= 9.3.3 when triggered in touch event handlers. It</span>
	<span class="hljs-comment">// completely stops working after triggering a few times... so, if native</span>
	<span class="hljs-comment">// Promise is available, we will use it:</span>
	<span class="hljs-comment">/* istanbul ignore next, $flow-disable-line */</span>
	<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Promise</span> !== <span class="hljs-string">'undefined'</span> &amp;&amp; isNative(<span class="hljs-built_in">Promise</span>)) {
	  <span class="hljs-keyword">const</span> p = <span class="hljs-built_in">Promise</span>.resolve()
	  timerFunc = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
	    p.then(flushCallbacks)
	    <span class="hljs-comment">// In problematic UIWebViews, Promise.then doesn't completely break, but</span>
	    <span class="hljs-comment">// it can get stuck in a weird state where callbacks are pushed into the</span>
	    <span class="hljs-comment">// microtask queue but the queue isn't being flushed, until the browser</span>
	    <span class="hljs-comment">// needs to do some other work, e.g. handle a timer. Therefore we can</span>
	    <span class="hljs-comment">// "force" the microtask queue to be flushed by adding an empty timer.</span>
	     <span class="hljs-keyword">if</span> (isIOS) setTimeout(noop)
	  }
	  isUsingMicroTask = <span class="hljs-literal">true</span>
	} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (!isIE &amp;&amp; <span class="hljs-keyword">typeof</span> MutationObserver !== <span class="hljs-string">'undefined'</span> &amp;&amp; (
	  isNative(MutationObserver) ||
	  <span class="hljs-comment">// PhantomJS and iOS 7.x</span>
	  MutationObserver.toString() === <span class="hljs-string">'[object MutationObserverConstructor]'</span>
	)) {
	  <span class="hljs-comment">// Use MutationObserver where native Promise is not available,</span>
	  <span class="hljs-comment">// e.g. PhantomJS, iOS7, Android 4.4</span>
	  <span class="hljs-comment">// (#6466 MutationObserver is unreliable in IE11)</span>
	  <span class="hljs-keyword">let</span> counter = <span class="hljs-number">1</span>
	  <span class="hljs-keyword">const</span> observer = <span class="hljs-keyword">new</span> MutationObserver(flushCallbacks)
	  <span class="hljs-keyword">const</span> textNode = <span class="hljs-built_in">document</span>.createTextNode(<span class="hljs-built_in">String</span>(counter))
	  observer.observe(textNode, {
	    <span class="hljs-attr">characterData</span>: <span class="hljs-literal">true</span>
	  })
	  timerFunc = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
	    counter = (counter + <span class="hljs-number">1</span>) % <span class="hljs-number">2</span>
	    textNode.data = <span class="hljs-built_in">String</span>(counter)
	  }
	  isUsingMicroTask = <span class="hljs-literal">true</span>
	} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> setImmediate !== <span class="hljs-string">'undefined'</span> &amp;&amp; isNative(setImmediate)) {
	  <span class="hljs-comment">// Fallback to setImmediate.</span>
	  <span class="hljs-comment">// Technically it leverages the (macro) task queue,</span>
	  <span class="hljs-comment">// but it is still a better choice than setTimeout.</span>
	  timerFunc = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
	    setImmediate(flushCallbacks)
	  }
	} <span class="hljs-keyword">else</span> {
	  <span class="hljs-comment">// Fallback to setTimeout.</span>
	  timerFunc = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
	    setTimeout(flushCallbacks, <span class="hljs-number">0</span>)
	  }
	}
	
	<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">nextTick</span> (<span class="hljs-params">cb?: Function, ctx?: Object</span>) </span>{
	  <span class="hljs-keyword">let</span> _resolve
	  callbacks.push(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
	    <span class="hljs-keyword">if</span> (cb) {
	      <span class="hljs-keyword">try</span> {
	        cb.call(ctx)
	      } <span class="hljs-keyword">catch</span> (e) {
	        handleError(e, ctx, <span class="hljs-string">'nextTick'</span>)
	      }
	    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (_resolve) {
	      _resolve(ctx)
	    }
	  })
	  <span class="hljs-keyword">if</span> (!pending) {
	    pending = <span class="hljs-literal">true</span>
	    timerFunc()
	  }
	  <span class="hljs-comment">// $flow-disable-line</span>
	  <span class="hljs-keyword">if</span> (!cb &amp;&amp; <span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Promise</span> !== <span class="hljs-string">'undefined'</span>) {
	    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
	      _resolve = resolve
	    })
	  }
	}
</code></pre>
<p data-nodeid="716">整体代码不是太多，注释比较多，其核心部分代码比较精简，主要在 40~80 行之间，核心在于 timerFunc 这个函数的逻辑实现，timerFunc 这个函数采用了好几种处理方式，主要是针对系统以及 Promise 的支持几个情况同时进行兼容性处理。处理逻辑情况是这样的：</p>
<ol data-nodeid="717">
<li data-nodeid="718">
<p data-nodeid="719">首先判断是否原生支持 Promise，支持的话，利用 promise 来触发执行回调函数；</p>
</li>
<li data-nodeid="720">
<p data-nodeid="721">如果不支持 Promise，再判断是否支持 MutationObserver，如果支持，那么生成一个对象来观察文本节点发生的变化，从而实现触发执行所有回调函数；</p>
</li>
<li data-nodeid="722">
<p data-nodeid="723">如果 Promise 和 MutationObserver 都不支持，那么使用 setTimeout 设置延时为 0。</p>
</li>
</ol>
<p data-nodeid="724">关于 Promise 以及 MutationObserver 的相关知识我已经在前面的课时中都讲过，因此这些方法你只要理解的话，那么再去理解这一讲 nextick 的 timerFunc 这个函数的逻辑就会比较轻松了。这里主要是一些兼容性的判断，即使你之前不清楚，但是看一下源码也就能很容易理解了，只要你的基础知识足够牢靠，学习这些并不复杂。</p>
<h3 data-nodeid="725">总结</h3>
<p data-nodeid="726">最后，针对 Process.nextick() 和 Vue 的 nextick 这两种不同的 tick ，我总结了下面这个表格，方便你深入理解。</p>
<p data-nodeid="831" class="te-preview-highlight"><img src="https://s0.lgstatic.com/i/image6/M01/25/22/CioPOWBZZXWAct2kAAFSwK67cM8982.png" alt="图片4.png" data-nodeid="834"></p>

<p data-nodeid="755">那么关于这部分知识，你如果有不理解的地方可以多学习几遍。我们的专栏主课内容到这里也就告一段落了，很高兴你能坚持到最后，也希望我的分享可以为你带来帮助。</p>
<p data-nodeid="756" class="">别着急走开，之后我们将进入彩蛋环节，一来是帮你梳理前端面试中经常考察的知识点，二来要给你传递学习算法的思路，我想这些也是你前端进阶的必要内容，我们下一讲再见。</p>

---

### 精选评论

##### **阳：
> 本文讲得有的迷糊，没有抓住核心要点：1.process. nexttick()的回调函数会在执行完本调用栈的方法后，执行微服务前，执行。2.vue nexttick会在dom更新后，执行。

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 你这么表述也是可以的

##### **楷：
> "因为它允许用户递归调用 Process.nextick 来挂起 I/O 进程的进行" 这句话不太理解意思..

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 描述很清晰呀

##### **山：
> vue.nextTick 简单的理解就是同步代码执行 -就把它推入执行栈，然后执行 ， 就这样周而复始。

