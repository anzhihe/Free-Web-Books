<p data-nodeid="645" class="">前两讲我们探讨了 JS 异步编程以及其中 Promise 的编程方式，那么这一讲作为延续，我再带你了解另外两种异步编程的方式。Generator 是 ES6 标准中的异步编程方式，而 async/await 是 ES7 标准中的。希望通过本讲的学习，你能对这两种编程方式有更深的理解。</p>
<p data-nodeid="646">那么在课程开始前请你先思考一下：</p>
<ol data-nodeid="647">
<li data-nodeid="648">
<p data-nodeid="649">Generator 执行之后，最后返回的是什么？</p>
</li>
<li data-nodeid="650">
<p data-nodeid="651">async/await 的方式比 Promise 和 Generator 好在哪里？</p>
</li>
</ol>
<p data-nodeid="652">现在让我们带着思考，开始学习。</p>
<h3 data-nodeid="653">Generator 基本介绍</h3>
<p data-nodeid="654">Generator（生成器）是 ES6 的新关键词，学习起来比较晦涩难懂，那么什么是 Generator 的函数呢？通俗来讲 Generator 是一个带星号的“函数”（它并不是真正的函数，下面的代码会为你验证），可以配合 yield 关键字来暂停或者执行函数。我们来看一段使用 Generator 的代码，如下所示。</p>
<pre class="lang-javascript" data-nodeid="655"><code data-language="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">gen</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"enter"</span>);
  <span class="hljs-keyword">let</span> a = <span class="hljs-keyword">yield</span> <span class="hljs-number">1</span>;
  <span class="hljs-keyword">let</span> b = <span class="hljs-keyword">yield</span> (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{<span class="hljs-keyword">return</span> <span class="hljs-number">2</span>})();
  <span class="hljs-keyword">return</span> <span class="hljs-number">3</span>;
}
<span class="hljs-keyword">var</span> g = gen()           <span class="hljs-comment">// 阻塞住，不会执行任何语句</span>
<span class="hljs-built_in">console</span>.log(g.next())
<span class="hljs-built_in">console</span>.log(g.next())
<span class="hljs-built_in">console</span>.log(g.next())
<span class="hljs-built_in">console</span>.log(g.next()) 
<span class="hljs-comment">//&nbsp;output:</span>
<span class="hljs-comment">// { value: 1, done: false }</span>
<span class="hljs-comment">// { value: 2, done: false }</span>
<span class="hljs-comment">// { value: 3, done: true }</span>
<span class="hljs-comment">// { value: undefined, done: true }</span>
</code></pre>
<p data-nodeid="656">结合上面的代码，我们分析一下 Generator 函数的执行情况。Generator 中配合使用 yield 关键词可以控制函数执行的顺序，每当执行一次 next 方法，Generator 函数会执行到下一个存在 yield 关键词的位置。</p>
<p data-nodeid="657">总结下来，Generator 的执行有这几个关键点。</p>
<ol data-nodeid="658">
<li data-nodeid="659">
<p data-nodeid="660">调用 gen() 后，程序会阻塞住，不会执行任何语句。</p>
</li>
<li data-nodeid="661">
<p data-nodeid="662">调用 g.next() 后，程序继续执行，直到遇到 yield 关键词时执行暂停。</p>
</li>
<li data-nodeid="663">
<p data-nodeid="664">一直执行 next 方法，最后返回一个对象，其存在两个属性：value&nbsp;和&nbsp;done。</p>
</li>
</ol>
<p data-nodeid="665">这就是 Generator 的基本内容，其中提到了 yield 这个关键词，下面我们就来看看它的基本情况。</p>
<h3 data-nodeid="666">yield基本介绍</h3>
<p data-nodeid="667">yield 同样也是 ES6 的新关键词，配合 Generator 执行以及暂停。yield 关键词最后返回一个迭代器对象，该对象有 value 和 done 两个属性，其中 done 属性代表返回值以及是否完成。yield 配合着 Generator，再同时使用 next 方法，可以主动控制 Generator 执行进度。</p>
<p data-nodeid="668">前面说 Generator 的时候，我举的是一个生成器函数的示例，下面我们看看多个 Generator 配合 yield 使用的情况，请看下面一段代码。</p>
<pre class="lang-java" data-nodeid="669"><code data-language="java">function* gen1() {
    yield <span class="hljs-number">1</span>;
    yield* gen2();
    yield <span class="hljs-number">4</span>;
}
function* gen2() {
    yield <span class="hljs-number">2</span>;
    yield <span class="hljs-number">3</span>;
}
<span class="hljs-keyword">var</span> g = gen1();
console.log(g.next())
console.log(g.next())
console.log(g.next())
console.log(g.next())
<span class="hljs-comment">// output:</span>
<span class="hljs-comment">// { value: 1, done: false }</span>
<span class="hljs-comment">// { value: 2, done: false }</span>
<span class="hljs-comment">// { value: 3, done: false }</span>
<span class="hljs-comment">// { value: 4, done: false }</span>
<span class="hljs-comment">// {value: undefined, done: true}</span>
</code></pre>
<p data-nodeid="670">从上面的代码中可以看出，使用 yield 关键词的话还可以配合着 Generator 函数嵌套使用，从而控制函数执行进度。这样对于 Generator 的使用，以及最终函数的执行进度都可以很好地控制，从而形成符合你设想的执行顺序。即便 Generator 函数相互嵌套，也能通过调用 next 方法来按照进度一步步执行。</p>
<p data-nodeid="671">那么讲到这里你可能会有几个疑惑，Generator 和异步编程有什么联系？怎么才可以把 Generator 函数按照顺序一次性执行完呢？接着往下看，你就会明白了。</p>
<h3 data-nodeid="672">thunk 函数介绍</h3>
<p data-nodeid="673">下面我带你看一下 thunk 函数，直接说概念可能会有些晦涩，我们通过一段代码来了解一下什么是 thunk 函数，就拿判断数据类型来举例，代码如下。</p>
<pre class="lang-javascript" data-nodeid="674"><code data-language="javascript"><span class="hljs-keyword">let</span> isString = <span class="hljs-function">(<span class="hljs-params">obj</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(obj) === <span class="hljs-string">'[object String]'</span>;
};
<span class="hljs-keyword">let</span> isFunction = <span class="hljs-function">(<span class="hljs-params">obj</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(obj) === <span class="hljs-string">'[object Function]'</span>;
};
<span class="hljs-keyword">let</span> isArray = <span class="hljs-function">(<span class="hljs-params">obj</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(obj) === <span class="hljs-string">'[object Array]'</span>;
};
....
</code></pre>
<p data-nodeid="675">可以看到，其中出现了非常多重复的数据类型判断逻辑，平常业务开发中类似的重复逻辑的场景也同样会有很多。我们将它们做一下封装，如下所示。</p>
<pre class="lang-javascript" data-nodeid="676"><code data-language="javascript"><span class="hljs-keyword">let</span> isType = <span class="hljs-function">(<span class="hljs-params">type</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">obj</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(obj) === <span class="hljs-string">`[object <span class="hljs-subst">${type}</span>]`</span>;
  }
}
</code></pre>
<p data-nodeid="677">那么封装了之后我们可以这么来使用，从而来减少重复的逻辑代码，如下所示。</p>
<pre class="lang-javascript" data-nodeid="678"><code data-language="javascript"><span class="hljs-keyword">let</span> isString = isType(<span class="hljs-string">'String'</span>);
<span class="hljs-keyword">let</span> isArray = isType(<span class="hljs-string">'Array'</span>);
isString(<span class="hljs-string">"123"</span>);    <span class="hljs-comment">// true</span>
isArray([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]);   <span class="hljs-comment">// true</span>
</code></pre>
<p data-nodeid="679">相应的&nbsp;isString 和 isArray 是由 isType 方法生产出来的函数，通过上面的方式来改造代码，明显简洁了不少。像 isType 这样的函数我们称为 thunk 函数，它的基本思路都是接收一定的参数，会生产出定制化的函数，最后使用定制化的函数去完成想要实现的功能。</p>
<p data-nodeid="680">这样的函数在 JS 的编程过程中会遇到很多，尤其是你在阅读一些开源项目时，抽象度比较高的 JS 代码往往都会采用这样的方式。</p>
<p data-nodeid="681">那么请你想一下，Generator 和 thunk 函数的结合是否能为我们带来一定的便捷性呢？</p>
<h3 data-nodeid="682">Generator 和 thunk 结合</h3>
<p data-nodeid="683">下面我以文件操作的代码为例，看一下 Generator 和 thunk 的结合能够对异步操作产生什么样的效果。</p>
<pre class="lang-javascript" data-nodeid="684"><code data-language="javascript"><span class="hljs-keyword">const</span> readFileThunk = <span class="hljs-function">(<span class="hljs-params">filename</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">callback</span>) =&gt;</span> {
    fs.readFile(filename, callback);
  }
}
<span class="hljs-keyword">const</span> gen = <span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> data1 = <span class="hljs-keyword">yield</span> readFileThunk(<span class="hljs-string">'1.txt'</span>)
  <span class="hljs-built_in">console</span>.log(data1.toString())
  <span class="hljs-keyword">const</span> data2 = <span class="hljs-keyword">yield</span> readFileThunk(<span class="hljs-string">'2.txt'</span>)
  <span class="hljs-built_in">console</span>.log(data2.toString)
}
<span class="hljs-keyword">let</span> g = gen();
g.next().value(<span class="hljs-function">(<span class="hljs-params">err, data1</span>) =&gt;</span> {
  g.next(data1).value(<span class="hljs-function">(<span class="hljs-params">err, data2</span>) =&gt;</span> {
    g.next(data2);
  })
})
</code></pre>
<p data-nodeid="685">readFileThunk 就是一个 thunk 函数，上面的这种编程方式就让&nbsp;Generator&nbsp;和异步操作关联起来了。上面第三段代码执行起来嵌套的情况还算简单，如果任务多起来，就会产生很多层的嵌套，可读性不强，因此我们有必要把执行的代码封装优化一下，如下所示。</p>
<pre class="lang-javascript" data-nodeid="686"><code data-language="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">run</span>(<span class="hljs-params">gen</span>)</span>{
  <span class="hljs-keyword">const</span> next = <span class="hljs-function">(<span class="hljs-params">err, data</span>) =&gt;</span> {
    <span class="hljs-keyword">let</span> res = gen.next(data);
    <span class="hljs-keyword">if</span>(res.done) <span class="hljs-keyword">return</span>;
    res.value(next);
  }
  next();
}
run(g);
</code></pre>
<p data-nodeid="687">改造完之后，我们可以看到 run 函数和上面的执行效果其实是一样的。代码虽然只有几行，但其包含了递归的过程，解决了多层嵌套的问题，并且完成了异步操作的一次性的执行效果。这就是通过 thunk 函数完成异步操作的情况，你可以好好体会一下。</p>
<p data-nodeid="688">以上介绍了 Generator 和 thunk 结合的情况，其实 Promise 也可以和 Generator 配合，以实现上面的效果，下面我们来看一下这种情况。</p>
<h3 data-nodeid="689">Generator 和 Promise 结合</h3>
<p data-nodeid="690">还是利用上面的输出文件的例子，对代码进行改造，如下所示。</p>
<pre class="lang-javascript te-preview-highlight" data-nodeid="1129"><code data-language="javascript"><span class="hljs-comment">// 最后包装成 Promise 对象进行返回</span>
<span class="hljs-keyword">const</span> readFilePromise = <span class="hljs-function">(<span class="hljs-params">filename</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    fs.readFile(filename, (err, data) =&gt; {
      <span class="hljs-keyword">if</span>(err) {
        reject(err);
      }<span class="hljs-keyword">else</span> {
        resolve(data);
      }
    })
  }).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res);
}
 <span class="hljs-keyword">let</span> g = gen();
<span class="hljs-comment">// 这块和上面 thunk 的方式一样</span>
<span class="hljs-keyword">const</span> gen = <span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> data1 = <span class="hljs-keyword">yield</span> readFilePromise(<span class="hljs-string">'1.txt'</span>)
  <span class="hljs-built_in">console</span>.log(data1.toString())
  <span class="hljs-keyword">const</span> data2 = <span class="hljs-keyword">yield</span> readFilePromise(<span class="hljs-string">'2.txt'</span>)
  <span class="hljs-built_in">console</span>.log(data2.toString)
}
<span class="hljs-comment">// 这块和上面 thunk 的方式一样</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">run</span>(<span class="hljs-params">gen</span>)</span>{
  <span class="hljs-keyword">const</span> next = <span class="hljs-function">(<span class="hljs-params">err, data</span>) =&gt;</span> {
    <span class="hljs-keyword">let</span> res = gen.next(data);
    <span class="hljs-keyword">if</span>(res.done) <span class="hljs-keyword">return</span>;
    res.value.then(next);
  }
  next();
}
run(g);
</code></pre>


<p data-nodeid="692">从上面的代码可以看出，thunk 函数的方式和通过 Promise 方式执行效果本质上是一样的，只不过通过 Promise 的方式也可以配合 Generator 函数实现同样的异步操作。希望你能参照上面 thunk 的例子，仔细体会一下递归调用的过程。</p>
<h3 data-nodeid="693">co 函数库</h3>
<p data-nodeid="694">co 函数库是著名程序员 TJ 发布的一个小工具，用于处理 Generator 函数的自动执行。核心原理其实就是上面讲的通过和 thunk 函数以及 Promise 对象进行配合，包装成一个库。它使用起来非常简单，比如还是用上面那段代码，第三段代码就可以省略了，直接引用 co 函数，包装起来就可以使用了，代码如下。</p>
<pre class="lang-java" data-nodeid="695"><code data-language="java"><span class="hljs-keyword">const</span> co = require(<span class="hljs-string">'co'</span>);
let g = gen();
co(g).then(res =&gt;{
  console.log(res);
})
</code></pre>
<p data-nodeid="696">这段代码比较简单，几行就完成了之前写的递归的那些操作。那么为什么 co 函数库可以自动执行 Generator 函数，它的处理原理是什么呢？</p>
<ol data-nodeid="697">
<li data-nodeid="698">
<p data-nodeid="699">因为 Generator 函数就是一个异步操作的容器，它需要一种自动执行机制，co 函数接受 Generator 函数作为参数，并最后返回一个 Promise 对象。</p>
</li>
<li data-nodeid="700">
<p data-nodeid="701">在返回的 Promise 对象里面，co 先检查参数 gen 是否为 Generator 函数。如果是，就执行该函数；如果不是就返回，并将 Promise 对象的状态改为 resolved。</p>
</li>
<li data-nodeid="702">
<p data-nodeid="703">co 将 Generator 函数的内部指针对象的 next 方法，包装成 onFulfilled 函数。这主要是为了能够捕捉抛出的错误。</p>
</li>
<li data-nodeid="704">
<p data-nodeid="705">关键的是 next 函数，它会反复调用自身。</p>
</li>
</ol>
<p data-nodeid="706">关于 co 的内部原理，你可以去 <a href="https://github.com/tj/co/blob/master/index.js" data-nodeid="776">co 的源码库</a>学习。代码不是很多，也比较清晰，按照上面我所讲的思路，你可以试着去理解，这对于提升你的 JavaScript 编码能力是很有帮助的。</p>
<p data-nodeid="707">那么，说完了 co 函数库，我们最后就来探究异步编程的终极解决方案：async/await。</p>
<h3 data-nodeid="708">async/await 介绍</h3>
<p data-nodeid="709">JS 的异步编程从最开始的回调函数的方式，演化到使用 Promise 对象，再到 Generator+co 函数的方式，每次都有一些改变，但又让人觉得不彻底，都需要理解底层运行机制。</p>
<p data-nodeid="710">而 async/await 被称为 JS 中异步终极解决方案，它既能够像 co+Generator 一样用同步的方式来书写异步代码，又得到底层的语法支持，无须借助任何第三方库。</p>
<p data-nodeid="711">接下来，我们就从原理的角度来看看 async/await 这个语法糖背后到底做了哪些优化和改进，使得我们用起来会更加方便。还是按照上面 Generator 和 Promise 结合的例子，使用 async/await 语法糖来进行改造，请看改造后的代码。</p>
<pre class="lang-javascript" data-nodeid="712"><code data-language="javascript"><span class="hljs-comment">// readFilePromise 依旧返回 Promise 对象</span>
<span class="hljs-keyword">const</span> readFilePromise = <span class="hljs-function">(<span class="hljs-params">filename</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    fs.readFile(filename, (err, data) =&gt; {
      <span class="hljs-keyword">if</span>(err) {
        reject(err);
      }<span class="hljs-keyword">else</span> {
        resolve(data);
      }
    })
  }).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res);
}
<span class="hljs-comment">// 这里把 Generator的 * 换成 async，把 yield 换成 await</span>
<span class="hljs-keyword">const</span> gen = <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> data1 = <span class="hljs-keyword">await</span> readFilePromise(<span class="hljs-string">'1.txt'</span>)
  <span class="hljs-built_in">console</span>.log(data1.toString())
  <span class="hljs-keyword">const</span> data2 = <span class="hljs-keyword">await</span> readFilePromise(<span class="hljs-string">'2.txt'</span>)
  <span class="hljs-built_in">console</span>.log(data2.toString)
}
</code></pre>
<p data-nodeid="713">从上面的代码中可以看到，虽然我们简单地将 Generator 的 * 号换成了 async，把 yield 换成了 await，但其实 async 的内部做了不少工作。我们根据 async 的原理详细拆解一下，看看它到底做了哪些工作。</p>
<p data-nodeid="714">总结下来，async 函数对 Generator 函数的改进，主要体现在以下三点。</p>
<ol data-nodeid="715">
<li data-nodeid="716">
<p data-nodeid="717">内置执行器：Generator 函数的执行必须靠执行器，因为不能一次性执行完成，所以之后才有了开源的 co 函数库。但是，async 函数和正常的函数一样执行，也不用 co 函数库，也不用使用 next 方法，而 async 函数自带执行器，会自动执行。</p>
</li>
<li data-nodeid="718">
<p data-nodeid="719">适用性更好：co 函数库有条件约束，yield 命令后面只能是 Thunk 函数或 Promise 对象，但是 async 函数的 await 关键词后面，可以不受约束。</p>
</li>
<li data-nodeid="720">
<p data-nodeid="721">可读性更好：async 和 await，比起使用 * 号和 yield，语义更清晰明了。</p>
</li>
</ol>
<p data-nodeid="722">说了这么多优点，我们还是通过一段简单的代码来看下 async 返回的结果，是不是使用起来更方便，请看下面的代码。</p>
<pre class="lang-javascript" data-nodeid="723"><code data-language="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-number">100</span>;
}
<span class="hljs-built_in">console</span>.log(func());
<span class="hljs-comment">// Promise {&lt;fulfilled&gt;: 100}</span>
</code></pre>
<p data-nodeid="724">从执行的结果可以看出，async 函数 func 最后返回的结果直接是 Promise 对象，比较方便让开发者继续往后处理。而之前 Generator 并不会自动执行，需要通过 next 方法控制，最后返回的也并不是 Promise 对象，而是需要通过 co 函数库来实现最后返回 Promise 对象。</p>
<p data-nodeid="725">这样看来，ES7 加入的 async/await 的确解决了之前的问题，使开发者在编程过程中更容易理解，语法更清晰，并且也不用再单独引用 co 函数库了。因此用 async/await 写出的代码也更加优雅，相比于之前的 Promise 和 co+Generator 的方式更容易理解，上手成本也更低，不愧是 JS 异步的终极解决方案。</p>
<p data-nodeid="726"><img src="https://s0.lgstatic.com/i/image6/M00/08/76/Cgp9HWA0wYmAKbOFAAVCoaU0ifI951.png" alt="金句1.png" data-nodeid="797"></p>
<h3 data-nodeid="727">总结</h3>
<p data-nodeid="728">这一讲，我带你把 Generator 以及 async/await 的异步编程方式学习了一遍，希望通过上面的介绍，你能够对 JS 异步编程理解更深一些。</p>
<p data-nodeid="729">最后，我整理了这几个异步编程的特点，你可以对比着来回顾，以加深记忆，请看下面的表格。</p>
<p data-nodeid="730"><img src="https://s0.lgstatic.com/i/image6/M01/08/70/Cgp9HWA0vFyAfpfGAAGGpm0z-f8269.png" alt="图片6.png" data-nodeid="803"></p>
<p data-nodeid="731">现在你可以回过头思考我在这一讲开头提出的两个问题了，是不是比较容易回答出来了呢？如果你对这部分内容还有不清楚的地方，可以有针对性地去学习。</p>
<p data-nodeid="732" class="">后面，我会继续带着你对 JS 异步编程的知识点进行更深入的剖析，下一讲我们就进入 EventEmitter 的学习，它是结合着设计模式实现 JS 异步编程的一种思路，也是值得深入研究和学习的。</p>

---

### 精选评论

##### *安：
> 作者大神，请问封装成promise的那块代码，第三部分的赋予const next 的函数是不是多了个err形参啊？then的成功回调不是只有一个形参吗？不明白那个data怎么传进去的。。。

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 是留着做异常处理的，只不过那个里面我没加错误处理而已

##### **恒：
> generator不是无法糖哈，是新的语法，需要js引擎实现的。只是可以通过Babel转义成es5的替代语法polyfill

##### *超：
> "Generator 和 Promise 结合"小节的run函数有错误，run函数中的next函数只能接收一个参数data，而不是(err, data）。传递两个参数100%报错

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 没有用到err，可以去了

