<p data-nodeid="38688">我在上一讲带你实现了一个浏览器端的 EventEmitter，那么这一讲还是继续进阶，我们来实现一个符合 Promise/A+ 规范的 Promise。</p>
<p data-nodeid="38689">其实在“<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=601#/detail/pc?id=6187" data-nodeid="38787">14 | 异步编程（中）：如何深入理解异步编程的核心 Promise</a>”中，我已经专门介绍了 Promise 的基本原理和使用情况。由于 Promise 在异步编程中的重要性不言而喻，因此在很多互联网大厂面试中，现场实现 Promise 相关方法的题目经常会出现，比如 all、race 或者 any 等。</p>
<p data-nodeid="38690">因此这一讲，我将要带你一步步实现一个符合标准的 Promise，希望你在遇到相关题目时能够游刃有余。</p>
<p data-nodeid="38691">在课程开始前请你先思考一下：</p>
<ol data-nodeid="38692">
<li data-nodeid="38693">
<p data-nodeid="38694">Promise/A+ 约定了哪些规范？</p>
</li>
<li data-nodeid="38695">
<p data-nodeid="38696">在手动实现 Promise 的过程中都遇到过哪些问题？</p>
</li>
</ol>
<p data-nodeid="38697">在开始手动实现 Promise 之前，你有必要先了解 Promise/A+ 的规范。</p>
<h3 data-nodeid="38698">Promise/A+ 规范</h3>
<p data-nodeid="38699">只有对规范进行解读并且形成明确的认知，才能更好地实现 Promise。官方的地址为：<a href="https://promisesaplus.com/" data-nodeid="38798">https://promisesaplus.com/</a>，这是一个英文的版本，我把其中比较关键的部分挑了出来。</p>
<h4 data-nodeid="38700">术语</h4>
<p data-nodeid="38701">先来看看 Promise/A+ 规范的基本术语，如下所示。</p>
<blockquote data-nodeid="38702">
<p data-nodeid="38703">“promise” is an object or function with a&nbsp;then&nbsp;method whose behavior conforms to this specification.<br>
“thenable” is an object or function that defines a&nbsp;then&nbsp;method.<br>
“value” is any legal JavaScript value (including&nbsp;undefined, a thenable, or a promise).<br>
“exception” is a value that is thrown using the&nbsp;throw&nbsp;statement.<br>
“reason” is a value that indicates why a promise was rejected.</p>
</blockquote>
<p data-nodeid="38704">翻译过来，它所描述的就是以下五点。</p>
<ol data-nodeid="38705">
<li data-nodeid="38706">
<p data-nodeid="38707">“promise”：是一个具有 then 方法的对象或者函数，它的行为符合该规范。</p>
</li>
<li data-nodeid="38708">
<p data-nodeid="38709">“thenable”：是一个定义了 then 方法的对象或者函数。</p>
</li>
<li data-nodeid="38710">
<p data-nodeid="38711">“value”：可以是任何一个合法的 JavaScript 的值（包括 undefined、thenable 或 promise）。</p>
</li>
<li data-nodeid="38712">
<p data-nodeid="38713">“exception”：是一个异常，是在 Promise 里面可以用 throw 语句抛出来的值。</p>
</li>
<li data-nodeid="38714">
<p data-nodeid="38715">“reason”：是一个 Promise 里 reject 之后返回的拒绝原因。</p>
</li>
</ol>
<h4 data-nodeid="38716">状态描述</h4>
<p data-nodeid="38717">看完了术语部分，我们再看下Promise/A+ 规范中，对 Promise 的内部状态的描述，如下所示。</p>
<blockquote data-nodeid="38718">
<p data-nodeid="38719">A promise must be in one of three states: pending, fulfilled, or rejected.<br>
When pending, a promise:<br>
may transition to either the fulfilled or rejected state.<br>
When fulfilled, a promise:<br>
must not transition to any other state.<br>
must have a value, which must not change.<br>
When rejected, a promise:<br>
must not transition to any other state.<br>
must have a reason, which must not change.<br>
Here, “must not change” means immutable identity (i.e.&nbsp;===), but does not imply deep immutability.</p>
</blockquote>
<p data-nodeid="38720">将上述描述总结起来，大致有以下几点。</p>
<ol data-nodeid="38721">
<li data-nodeid="38722">
<p data-nodeid="38723">一个 Promise 有三种状态：pending、fulfilled 和 rejected。</p>
</li>
<li data-nodeid="38724">
<p data-nodeid="38725">当状态为 pending 状态时，即可以转换为 fulfilled 或者 rejected 其中之一。</p>
</li>
<li data-nodeid="38726">
<p data-nodeid="38727">当状态为 fulfilled 状态时，就不能转换为其他状态了，必须返回一个不能再改变的值。</p>
</li>
<li data-nodeid="38728">
<p data-nodeid="38729">当状态为 rejected 状态时，同样也不能转换为其他状态，必须有一个原因的值也不能改变。</p>
</li>
</ol>
<h4 data-nodeid="38730">then 方法</h4>
<p data-nodeid="38731">关于 then 方法的英文解读和翻译，我直接总结了出来：一个 Promise 必须拥有一个 then 方法来访问它的值或者拒绝原因。</p>
<p data-nodeid="38732">then 方法有两个参数：</p>
<blockquote data-nodeid="38733">
<p data-nodeid="38734">promise.then(onFulfilled, onRejected)</p>
</blockquote>
<p data-nodeid="38735">onFulfilled&nbsp;和&nbsp;onRejected&nbsp;都是可选参数。</p>
<p data-nodeid="38736"><strong data-nodeid="38851">onFulfilled 和 onRejected&nbsp;特性</strong></p>
<p data-nodeid="38737">如果&nbsp;onFulfilled&nbsp;是函数，则当 Promise 执行结束之后必须被调用，最终返回值为 value，其调用次数不可超过一次。而 onRejected 除了最后返回的是 reason 外，其他方面和 onFulfilled 在规范上的表述基本一样。</p>
<p data-nodeid="38738"><strong data-nodeid="38856">多次调用</strong></p>
<p data-nodeid="38739">then 方法其实可以被一个 Promise 调用多次，且必须返回一个 Promise 对象。then 的写法如下所示，其中 Promise1 执行了 then 的方法之后，返回的依旧是个 Promise2，然后我们拿着 Promise2 又可以执行 then 方法，而 Promise2 是一个新的 Promise 对象，又可以继续进行 then 方法调用。</p>
<pre class="lang-javascript" data-nodeid="38740"><code data-language="javascript">promise2 = promise1.then(onFulfilled, onRejected);
</code></pre>
<p data-nodeid="38741">规范里面还有很大一部分讲解的是 Promise 的解决过程。其实只看规范的话，整体感觉很空洞，方才我已经将规范的主要部分为你讲解了，这些内容基本可以指导我们自己实现一个 Promise 了。</p>
<p data-nodeid="38742">那么下面我们就理论结合实践，动手实现一个 Promise 吧。</p>
<h3 data-nodeid="38743">一步步实现 Promise</h3>
<p data-nodeid="38744">按照 Promise/A+ 的规范，第一步就是构造函数。</p>
<h4 data-nodeid="38745">构造函数</h4>
<p data-nodeid="38746">这一步的思路是：Promise 构造函数接受一个 executor 函数，executor 函数执行完同步或者异步操作后，调用它的两个参数 resolve 和 reject。请看下面的代码，大致的构造函数框架就是这样的。</p>
<pre class="lang-javascript" data-nodeid="38747"><code data-language="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Promise</span>(<span class="hljs-params">executor</span>) </span>{
  <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>
  self.status = <span class="hljs-string">'pending'</span>   <span class="hljs-comment">// Promise当前的状态</span>
  self.data = <span class="hljs-literal">undefined</span>     <span class="hljs-comment">// Promise的值</span>
  self.onResolvedCallback = [] <span class="hljs-comment">// Promise resolve时的回调函数集</span>
  self.onRejectedCallback = [] <span class="hljs-comment">// Promise reject时的回调函数集</span>
  executor(resolve, reject) <span class="hljs-comment">// 执行executor并传入相应的参数</span>
}
</code></pre>
<p data-nodeid="38748">从上面的代码中可以看出，我们先定义了一个 Promise 的初始状态 pending，以及参数执行函数 executor，并且按照规范设计了一个 resolve 回调函数集合数组 onResolvedCallback 以及 一个 reject 回调函数集合数组，那么构造函数的初始化就基本完成了。</p>
<p data-nodeid="38749">接下来我们看看还需要添加什么东西呢？那就是需要在构造函数中完善 resolve 和 reject 两个函数，完善之后的代码如下。</p>
<pre class="lang-javascript" data-nodeid="38750"><code data-language="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Promise</span>(<span class="hljs-params">executor</span>) </span>{
  <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>
  self.status = <span class="hljs-string">'pending'</span>   <span class="hljs-comment">// Promise当前的状态</span>
  self.data = <span class="hljs-literal">undefined</span>    <span class="hljs-comment">// Promise的值</span>
  self.onResolvedCallback = [] <span class="hljs-comment">// Promise resolve时的回调函数集</span>
  self.onRejectedCallback = [] <span class="hljs-comment">// Promise reject时的回调函数集</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">value</span>) </span>{
    <span class="hljs-comment">// TODO</span>
  }
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reject</span>(<span class="hljs-params">reason</span>) </span>{
    <span class="hljs-comment">// TODO</span>
  }
  <span class="hljs-keyword">try</span> { <span class="hljs-comment">// 考虑到执行过程中有可能出错，所以我们用try/catch块给包起</span>
    executor(resolve, reject) <span class="hljs-comment">// 执行executor</span>
  } <span class="hljs-keyword">catch</span>(e) {
    reject(e)
  }
}
</code></pre>
<p data-nodeid="38751">resolve 和 reject 内部应该怎么实现呢？我们根据规范知道这两个方法主要做的事情就是返回对应状态的值 value 或者 reason，并把 Promise 内部的 status 从 pending 变成对应的状态，并且这个状态在改变了之后是不可以逆转的。</p>
<p data-nodeid="38752">那么这两个函数应该怎么写呢？可以看下面的这段代码。</p>
<pre class="lang-javascript" data-nodeid="38753"><code data-language="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Promise</span>(<span class="hljs-params">executor</span>) </span>{
  <span class="hljs-comment">// ...上面的省略</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">value</span>) </span>{
    <span class="hljs-keyword">if</span> (self.status === <span class="hljs-string">'pending'</span>) {
      self.status = <span class="hljs-string">'resolved'</span>
      self.data = value
      <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; self.onResolvedCallback.length; i++) {
        self.onResolvedCallback[i](value)
      }
    }
  }
  
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reject</span>(<span class="hljs-params">reason</span>) </span>{
    <span class="hljs-keyword">if</span> (self.status === <span class="hljs-string">'pending'</span>) {
      self.status = <span class="hljs-string">'rejected'</span>
      self.data = reason
      <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; self.onRejectedCallback.length; i++) {
        self.onRejectedCallback[i](reason)
      }
    }
  }
  <span class="hljs-comment">// 下面的省略</span>
}
</code></pre>
<p data-nodeid="38754">上述代码所展示的，基本就是在判断状态为 pending 之后，把状态改为相应的值，并把对应的 value 和 reason 存在内部的 data 属性上面，之后执行相应的回调函数。逻辑比较简单，无非是由于 onResolveCallback 和 onRejectedCallback 这两个是数组，需要通过循环来执行，这里就不多解释了，你应该会知道。</p>
<p data-nodeid="38755">好了，构造函数基本就实现了，那么我们再看看如何实现 then 方法，从而保证可以实现链式调用。</p>
<h4 data-nodeid="38756">实现 then 方法</h4>
<p data-nodeid="38757">根据标准，我们要考虑几个问题。</p>
<p data-nodeid="38758">then 方法是 Promise 执行完之后可以拿到 value 或者 reason 的方法，并且还要保持 then 执行之后，返回的依旧是一个 Promise 方法，还要支持多次调用（上面标准中提到过）。</p>
<p data-nodeid="38759">因此 then 方法实现的思路也有了，请看下面的一段代码。</p>
<pre class="lang-javascript" data-nodeid="38760"><code data-language="javascript"><span class="hljs-comment">// then方法接收两个参数onResolved和onRejected，分别为Promise成功或失败后的回调</span>
<span class="hljs-built_in">Promise</span>.prototype.then = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">onResolved, onRejected</span>) </span>{
  <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>
  <span class="hljs-keyword">var</span> promise2
  <span class="hljs-comment">// 根据标准，如果then的参数不是function，则需要忽略它</span>
  onResolved = <span class="hljs-keyword">typeof</span> onResolved === <span class="hljs-string">'function'</span> ? onResolved : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>) </span>{}
  onRejected = <span class="hljs-keyword">typeof</span> onRejected === <span class="hljs-string">'function'</span> ? onRejected : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">r</span>) </span>{}
  <span class="hljs-keyword">if</span> (self.status === <span class="hljs-string">'resolved'</span>) {
    <span class="hljs-keyword">return</span> promise2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
    })
  }
  <span class="hljs-keyword">if</span> (self.status === <span class="hljs-string">'rejected'</span>) {
    <span class="hljs-keyword">return</span> promise2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
    })
  }
  <span class="hljs-keyword">if</span> (self.status === <span class="hljs-string">'pending'</span>) {
    <span class="hljs-keyword">return</span> promise2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
    })
  }
}
</code></pre>
<p data-nodeid="38761">从上面的代码中可以看到，我们在 then 方法内部先初始化了 Promise2 的对象，用来存放执行之后返回的 Promise，并且还需要判断 then 方法传参进来的两个参数必须为函数，这样才可以继续执行。</p>
<p data-nodeid="38762">上面我只是搭建了 then 方法框架的整体思路，但是不同状态的返回细节处理也需要完善，通过仔细阅读标准，完善之后的 then 的代码如下。</p>
<pre class="lang-javascript" data-nodeid="38763"><code data-language="javascript"><span class="hljs-built_in">Promise</span>.prototype.then = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">onResolved, onRejected</span>) </span>{
  <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>
  <span class="hljs-keyword">var</span> promise2
  <span class="hljs-comment">// 根据标准，如果then的参数不是function，则需要忽略它</span>
  onResolved = <span class="hljs-keyword">typeof</span> onResolved === <span class="hljs-string">'function'</span> ? onResolved : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{}
  onRejected = <span class="hljs-keyword">typeof</span> onRejected === <span class="hljs-string">'function'</span> ? onRejected : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reason</span>) </span>{}
  <span class="hljs-keyword">if</span> (self.status === <span class="hljs-string">'resolved'</span>) {
    <span class="hljs-comment">// 如果promise1的状态已经确定并且是resolved，我们调用onResolved，考虑到有可能throw，所以还需要将其包在try/catch块里</span>
    <span class="hljs-keyword">return</span> promise2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">var</span> x = onResolved(self.data)
        <span class="hljs-keyword">if</span> (x <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Promise</span>) {
<span class="hljs-comment">// 如果onResolved的返回值是一个Promise对象，直接取它的结果作为promise2的结果</span>
          x.then(resolve, reject)
        }
        resolve(x) <span class="hljs-comment">// 否则，以它的返回值作为promise2的结果</span>
      } <span class="hljs-keyword">catch</span> (e) {
        reject(e) <span class="hljs-comment">// 如果出错，以捕获到的错误作为promise2的结果</span>
      }
    })
  }
  <span class="hljs-comment">// 此处与前一个if块的逻辑几乎相同，区别在于所调用的是onRejected函数</span>
  <span class="hljs-keyword">if</span> (self.status === <span class="hljs-string">'rejected'</span>) {
    <span class="hljs-keyword">return</span> promise2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">var</span> x = onRejected(self.data)
        <span class="hljs-keyword">if</span> (x <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Promise</span>) {
          x.then(resolve, reject)
        }
      } <span class="hljs-keyword">catch</span> (e) {
        reject(e)
      }
    })
  }
  <span class="hljs-keyword">if</span> (self.status === <span class="hljs-string">'pending'</span>) {
  <span class="hljs-comment">// 如果当前的Promise还处于pending状态，我们并不能确定调用onResolved还是onRejected，只能等到Promise的状态确定后，才能确定如何处理</span>
    <span class="hljs-keyword">return</span> promise2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
      self.onResolvedCallback.push(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
        <span class="hljs-keyword">try</span> {
          <span class="hljs-keyword">var</span> x = onResolved(self.data)
          <span class="hljs-keyword">if</span> (x <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Promise</span>) {
            x.then(resolve, reject)
          }
        } <span class="hljs-keyword">catch</span> (e) {
          reject(e)
        }
      })
      self.onRejectedCallback.push(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reason</span>) </span>{
        <span class="hljs-keyword">try</span> {
          <span class="hljs-keyword">var</span> x = onRejected(self.data)
          <span class="hljs-keyword">if</span> (x <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Promise</span>) {
            x.then(resolve, reject)
          }
        } <span class="hljs-keyword">catch</span> (e) {
          reject(e)
        }
      })
    })
  }
}
</code></pre>
<p data-nodeid="38764">根据上面的代码可以看出，我们基本实现了一个符合标准的 then 方法。但是标准里提到了，还要支持不同的 Promise 进行交互，关于不同的 Promise 交互其实<a href="https://promisesaplus.com/#point-46" data-nodeid="38879">Promise 标准说明</a>中有提到。其中详细指定了如何通过 then 的实参返回的值来决定 Promise2 的状态。</p>
<p data-nodeid="38765">关于为何需要不同的 Promise 实现交互，原因应该是 Promise 并不是 JS 一开始存在的标准，如果你使用的某一个库中封装了一个 Promise 的实现，想象一下如果它不能跟你自己使用的 Promise 实现交互的情况，其实还是会有问题的，因此我们还需要调整一下 then 方法中执行 Promise 的方法。</p>
<p data-nodeid="38766">另外还有一个需要注意的是，在 Promise/A+ 规范中，onResolved 和 onRejected 这两项函数需要异步调用，关于这一点，标准里面是这么说的：</p>
<blockquote data-nodeid="38767">
<p data-nodeid="38768">In practice, this requirement ensures that onFulfilled and onRejected execute asynchronously, after the event loop turn in which then is called, and with a fresh stack.</p>
</blockquote>
<p data-nodeid="38769">所以我们需要对代码做一点变动，即在处理 Promise 进行 resolve 或者 reject 的时候，加上 setTimeout(fn, 0)。</p>
<p data-nodeid="38770">下面我就结合上面两点调整，给出完整版的代码，你可以根据注释关注一下我所做的调整。</p>
<pre class="lang-javascript" data-nodeid="38771"><code data-language="javascript"><span class="hljs-keyword">try</span> {
  <span class="hljs-built_in">module</span>.exports = <span class="hljs-built_in">Promise</span>
} <span class="hljs-keyword">catch</span> (e) {}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Promise</span>(<span class="hljs-params">executor</span>) </span>{
  <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>
  self.status = <span class="hljs-string">'pending'</span>
  self.onResolvedCallback = []
  self.onRejectedCallback = []
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">value</span>) </span>{
    <span class="hljs-keyword">if</span> (value <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Promise</span>) {
      <span class="hljs-keyword">return</span> value.then(resolve, reject)
    }
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// 异步执行所有的回调函数</span>
      <span class="hljs-keyword">if</span> (self.status === <span class="hljs-string">'pending'</span>) {
        self.status = <span class="hljs-string">'resolved'</span>
        self.data = value
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; self.onResolvedCallback.length; i++) {
          self.onResolvedCallback[i](value)
        }
      }
    })
  }
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reject</span>(<span class="hljs-params">reason</span>) </span>{
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// 异步执行所有的回调函数</span>
      <span class="hljs-keyword">if</span> (self.status === <span class="hljs-string">'pending'</span>) {
        self.status = <span class="hljs-string">'rejected'</span>
        self.data = reason
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; self.onRejectedCallback.length; i++) {
          self.onRejectedCallback[i](reason)
        }
      }
    })
  }
  <span class="hljs-keyword">try</span> {
    executor(resolve, reject)
  } <span class="hljs-keyword">catch</span> (reason) {
    reject(reason)
  }
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolvePromise</span>(<span class="hljs-params">promise2, x, resolve, reject</span>) </span>{
  <span class="hljs-keyword">var</span> then
  <span class="hljs-keyword">var</span> thenCalledOrThrow = <span class="hljs-literal">false</span>
  <span class="hljs-keyword">if</span> (promise2 === x) {
    <span class="hljs-keyword">return</span> reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">'Chaining cycle detected for promise!'</span>))
  }
  <span class="hljs-keyword">if</span> (x <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Promise</span>) {
    <span class="hljs-keyword">if</span> (x.status === <span class="hljs-string">'pending'</span>) { 
      x.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>) </span>{
        resolvePromise(promise2, v, resolve, reject)
      }, reject)
    } <span class="hljs-keyword">else</span> {
      x.then(resolve, reject)
    }
    <span class="hljs-keyword">return</span>
  }
  <span class="hljs-keyword">if</span> ((x !== <span class="hljs-literal">null</span>) &amp;&amp; ((<span class="hljs-keyword">typeof</span> x === <span class="hljs-string">'object'</span>) || (<span class="hljs-keyword">typeof</span> x === <span class="hljs-string">'function'</span>))) {
    <span class="hljs-keyword">try</span> {
      then = x.then
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> then === <span class="hljs-string">'function'</span>) {
        then.call(x, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">rs</span>(<span class="hljs-params">y</span>) </span>{
          <span class="hljs-keyword">if</span> (thenCalledOrThrow) <span class="hljs-keyword">return</span>
          thenCalledOrThrow = <span class="hljs-literal">true</span>
          <span class="hljs-keyword">return</span> resolvePromise(promise2, y, resolve, reject)
        }, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">rj</span>(<span class="hljs-params">r</span>) </span>{
          <span class="hljs-keyword">if</span> (thenCalledOrThrow) <span class="hljs-keyword">return</span>
          thenCalledOrThrow = <span class="hljs-literal">true</span>
          <span class="hljs-keyword">return</span> reject(r)
        })
      } <span class="hljs-keyword">else</span> {
        resolve(x)
      }
    } <span class="hljs-keyword">catch</span> (e) {
      <span class="hljs-keyword">if</span> (thenCalledOrThrow) <span class="hljs-keyword">return</span>
      thenCalledOrThrow = <span class="hljs-literal">true</span>
      <span class="hljs-keyword">return</span> reject(e)
    }
  } <span class="hljs-keyword">else</span> {
    resolve(x)
  }
}
<span class="hljs-built_in">Promise</span>.prototype.then = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">onResolved, onRejected</span>) </span>{
  <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>
  <span class="hljs-keyword">var</span> promise2
  onResolved = <span class="hljs-keyword">typeof</span> onResolved === <span class="hljs-string">'function'</span> ? onResolved : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>) </span>{
    <span class="hljs-keyword">return</span> v
  }
  onRejected = <span class="hljs-keyword">typeof</span> onRejected === <span class="hljs-string">'function'</span> ? onRejected : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">r</span>) </span>{
    <span class="hljs-keyword">throw</span> r
  }
  <span class="hljs-keyword">if</span> (self.status === <span class="hljs-string">'resolved'</span>) {
    <span class="hljs-keyword">return</span> promise2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
      setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// 异步执行onResolved</span>
        <span class="hljs-keyword">try</span> {
          <span class="hljs-keyword">var</span> x = onResolved(self.data)
          resolvePromise(promise2, x, resolve, reject)
        } <span class="hljs-keyword">catch</span> (reason) {
          reject(reason)
        }
      })
    })
  }
  <span class="hljs-keyword">if</span> (self.status === <span class="hljs-string">'rejected'</span>) {
    <span class="hljs-keyword">return</span> promise2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
      setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// 异步执行onRejected</span>
        <span class="hljs-keyword">try</span> {
          <span class="hljs-keyword">var</span> x = onRejected(self.data)
          resolvePromise(promise2, x, resolve, reject)
        } <span class="hljs-keyword">catch</span> (reason) {
          reject(reason)
        }
      })
    })
  }
  <span class="hljs-keyword">if</span> (self.status === <span class="hljs-string">'pending'</span>) {
    <span class="hljs-comment">// 这里之所以没有异步执行，是因为这些函数必然会被resolve或reject调用，而resolve或reject函数里的内容已是异步执行，构造函数里的定义</span>
    <span class="hljs-keyword">return</span> promise2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
      self.onResolvedCallback.push(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
        <span class="hljs-keyword">try</span> {
          <span class="hljs-keyword">var</span> x = onResolved(value)
          resolvePromise(promise2, x, resolve, reject)
        } <span class="hljs-keyword">catch</span> (r) {
          reject(r)
        }
      })
      self.onRejectedCallback.push(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reason</span>) </span>{
          <span class="hljs-keyword">try</span> {
            <span class="hljs-keyword">var</span> x = onRejected(reason)
            resolvePromise(promise2, x, resolve, reject)
          } <span class="hljs-keyword">catch</span> (r) {
            reject(r)
          }
        })
    })
  }
}
<span class="hljs-built_in">Promise</span>.prototype.catch = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">onRejected</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.then(<span class="hljs-literal">null</span>, onRejected)
}
<span class="hljs-comment">// 最后这个是测试用的，后面会说</span>
<span class="hljs-built_in">Promise</span>.deferred = <span class="hljs-built_in">Promise</span>.defer = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> dfd = {}
  dfd.promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
    dfd.resolve = resolve
    dfd.reject = reject
  })
  <span class="hljs-keyword">return</span> dfd
}
</code></pre>
<p data-nodeid="38772">上面这段代码就是通过一步步优化调整出来的最终版，其中细节也是比较多的，介于篇幅问题，暂时能讲的点就先说这么多。如果你还有哪里不清楚的，最好还是动手实践去理解。</p>
<p data-nodeid="38773">最终版的 Promise 的实现还是需要经过规范的测试（Promise /A+ 规范测试的工具地址为：<a href="https://github.com/promises-aplus/promises-tests" data-nodeid="38890">https://github.com/promises-aplus/promises-tests</a>），需要暴露一个 deferred 方法（即 exports.deferred 方法），上面提供的代码中我已经将其加了进去。</p>
<p data-nodeid="38774">最后，执行如下代码 npm 安装之后，即可执行测试。</p>
<pre class="lang-java" data-nodeid="38775"><code data-language="java">npm i -g promises-aplus-tests
promises-aplus-tests Promise.js
</code></pre>
<h3 data-nodeid="38776">总结</h3>
<p data-nodeid="39758" class="te-preview-highlight">讲到这里，你可以再思考一下 Promise /A+ 规范中的一些细节，以及实现过程中需要注意的问题，如果你能够在面试中实现一个这样的 Promise，就基本可以满足岗位的需求了。</p>

<p data-nodeid="38778">通过这一讲的学习，你应该能理解 Promise 底层的实现逻辑了，虽然并不一定有场景适合落地业务，但是整个手动实现的过程对于你 JS 编码能力的提升会很有帮助。</p>
<p data-nodeid="38779">关于 Promise 还有很多 API 的方法，在已经实现的 Promise 的版本之上，你可以再尝试实现 all、race 以及 any 等方法，学会举一反三，才能在工作中游刃有余。</p>
<p data-nodeid="38780">下一讲开始，我们就要进入一个新的模块——JS 引擎篇，我要带你了解 JS 引擎中的垃圾回收机制、事件轮询等，这对于写出高性能的 JavaScript 代码有着很好的帮助。</p>
<p data-nodeid="38781">我们到时见。</p>

---

### 精选评论

##### **5008：
> 规范中说了只能有三种状态pending, fulfilled, or rejected为什么代码中又是 resloved 呢

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; Resolve不是状态，你仔细理解学习一下，Promise里面就三种状态

##### **yunxiaomeng：
> 老师是不是可以认为“因为promise的then方法的onFullfilled（失败的话是onReject）参数必须被调用而且调用次数不能超过一次而且then方法返回的是一个新的promise对象，所以说promise状态值一旦改变不可中断或逆转”？

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 是的，Promise的状态值一旦改变不能逆转

##### **web前端：
> Promise.resolve().then(function(){console.log(0);return Promise.resolve(4);}).then(function(res){console.log(res);});Promise.resolve().then(function(){console.log(1);}).then(function(){console.log(2);}).then(function(){console.log(3);}).then(function(){console.log(5);}).then(function(){console.log(6);});老师有看到过这道题么,执行顺序不知道怎么解释

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 可以再看下21讲，结合宏任务和微任务那一讲一起看一下

##### **俊：
> 请教这个，thenCalledOrThrow 是为了什么？好像删掉，并没有影响程序

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; then被调用或者throw出去

##### **生：
> 我接着我的上一个问题提疑：onResolved之后的值怎么可能会完全与promise2相等呢？

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; onresolved 之后 Promise 对象最后都会返回值，因此拿他来和 x 判断就是看这个Promise是否已经执行完返回预期的值，状态已经不可逆转了，不知道是否理解了

##### **生：
> 若离老是，你好！if (promise2 === x) { return reject(new TypeError('Chaining cycle detected for promise!')) }这个代码块我一直理解不了：promise2怎么可能和x完全相等呢？

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 可以看下resolvePromise是给下面then方法内部调用的，x是参数，传入的是onResolved之后的值，通过这个来进行判断的

##### **帆：
> 催更了！！

##### **zzz：
> 再有不到三周就可以学完了，老师辛苦

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 加油！

##### *洋：
> 多久更新一节啊？

 ###### &nbsp;&nbsp;&nbsp; 编辑回复：
> &nbsp;&nbsp;&nbsp; 每周一、周三更哦

##### **帆：
> 读了好几遍，敲了一边终于弄懂了。代码还是得仔细品味呀！

