<p data-nodeid="5493" class="">我在上一讲为你剖析了闭包这个难点，带你了解了作用域、闭包产生的原因及表现形式。那么这一讲，我们一起来手工实现一个 JSON.stringify 的方法。</p>
<p data-nodeid="5494">这个方法能够站在全局考察你对 JS 各种数据类型理解的深度，对各种极端的边界情况处理能力，以及 JS 的编码能力。之所以将这篇作为这一模块的进阶，是因为我想把整个数据类型的知识点串起来，让你理解得更加融会贯通，能够更上一层楼。</p>
<p data-nodeid="5626" class="te-preview-highlight">在大厂的前端面试过程中，这个题目也经常会被问到。大部分候选人只知道这个方法的作用，而如果让他自己实现一个 JSON.Srtingify 方法的话，大多数人都不一定能写出来，或者即便能写出来一些，但是考虑的问题又不够全面。</p>

<p data-nodeid="5496">因此你要想夯实自身 JavaScript 的编程基础，通过实践来实现一些 JS API 方法，是非常有必要的，所以这一讲我就来帮你搞懂它。</p>
<p data-nodeid="5497">那么，到底什么是 JSON.stringify 方法？</p>
<h3 data-nodeid="5498">方法基本介绍</h3>
<p data-nodeid="5499">JSON.stringify 是日常开发中经常用到的 JSON 对象中的一个方法，JSON 对象包含两个方法：一是用于解析成 JSON 对象的 parse()；二是用于将对象转换为 JSON 字符串方法的 stringify()。下面我们分别来看下两个方法的基本使用情况。</p>
<h4 data-nodeid="5500">JSON.parse</h4>
<p data-nodeid="5501">JSON.parse 方法用来解析 JSON 字符串，构造由字符串描述的 JavaScript 值或对象。该方法有两个参数：第一个参数是需要解析处理的 JSON 字符串，第二个参数是可选参数提供可选的&nbsp;reviver&nbsp;函数，用在返回之前对所得到的对象执行变换操作。</p>
<blockquote data-nodeid="5502">
<p data-nodeid="5503">该方法的语法为：JSON.parse(text[, reviver])</p>
</blockquote>
<p data-nodeid="5504">下面通过一段代码来看看这个方法以及 reviver 参数的用法，如下所示。</p>
<pre class="lang-javascript" data-nodeid="5505"><code data-language="javascript"><span class="hljs-keyword">const</span> json = <span class="hljs-string">'{"result":true, "count":2}'</span>;
<span class="hljs-keyword">const</span> obj = <span class="hljs-built_in">JSON</span>.parse(json);
<span class="hljs-built_in">console</span>.log(obj.count);
<span class="hljs-comment">// 2</span>
<span class="hljs-built_in">console</span>.log(obj.result);
<span class="hljs-comment">// true</span>
<span class="hljs-comment">/* 带第二个参数的情况 */</span>
<span class="hljs-built_in">JSON</span>.parse(<span class="hljs-string">'{"p": 5}'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">k, v</span>) </span>{
    <span class="hljs-keyword">if</span>(k === <span class="hljs-string">''</span>) <span class="hljs-keyword">return</span> v;     <span class="hljs-comment">// 如果k不是空，</span>
    <span class="hljs-keyword">return</span> v * <span class="hljs-number">2</span>;              <span class="hljs-comment">// 就将属性值变为原来的2倍返回</span>
});                            <span class="hljs-comment">// { p: 10 }</span>
</code></pre>
<p data-nodeid="5506">上面的代码说明了，我们可以将一个符合 JSON 格式的字符串转化成对象返回；带第二个参数的情况，可以将待处理的字符串进行一定的操作处理，比如上面这个例子就是将属性值乘以 2 进行返回。</p>
<p data-nodeid="5507">下面我们来了解一下 JSON.stringify 的基本情况。</p>
<h4 data-nodeid="5508">JSON.stringify</h4>
<p data-nodeid="5509">JSON.stringify 方法是将一个 JavaScript&nbsp;对象或值转换为 JSON 字符串，默认该方法其实有三个参数：第一个参数是必选，后面两个是可选参数非必选。第一个参数传入的是要转换的对象；第二个是一个 replacer 函数，比如指定的&nbsp;replacer 是数组，则可选择性地仅处理包含数组指定的属性；第三个参数用来控制结果字符串里面的间距，后面两个参数整体用得比较少。</p>
<blockquote data-nodeid="5510">
<p data-nodeid="5511">该方法的语法为：JSON.stringify(value[, replacer [, space]])</p>
</blockquote>
<p data-nodeid="5512">下面我们通过一段代码来看看后面几个参数的妙用，如下所示。</p>
<pre class="lang-javascript" data-nodeid="5513"><code data-language="javascript"><span class="hljs-built_in">JSON</span>.stringify({ <span class="hljs-attr">x</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">2</span> });
<span class="hljs-comment">// "{"x":1,"y":2}"</span>
<span class="hljs-built_in">JSON</span>.stringify({ <span class="hljs-attr">x</span>: [<span class="hljs-number">10</span>, <span class="hljs-literal">undefined</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{}, <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">''</span>)] })
<span class="hljs-comment">// "{"x":[10,null,null,null]}"</span>
<span class="hljs-comment">/* 第二个参数的例子 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">replacer</span>(<span class="hljs-params">key, value</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> value === <span class="hljs-string">"string"</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">undefined</span>;
  }
  <span class="hljs-keyword">return</span> value;
}
<span class="hljs-keyword">var</span> foo = {<span class="hljs-attr">foundation</span>: <span class="hljs-string">"Mozilla"</span>, <span class="hljs-attr">model</span>: <span class="hljs-string">"box"</span>, <span class="hljs-attr">week</span>: <span class="hljs-number">4</span>, <span class="hljs-attr">transport</span>: <span class="hljs-string">"car"</span>, <span class="hljs-attr">month</span>: <span class="hljs-number">7</span>};
<span class="hljs-keyword">var</span> jsonString = <span class="hljs-built_in">JSON</span>.stringify(foo, replacer);
<span class="hljs-built_in">console</span>.log(jsonString);
<span class="hljs-comment">// "{"week":4,"month":7}"</span>
<span class="hljs-comment">/* 第三个参数的例子 */</span>
<span class="hljs-built_in">JSON</span>.stringify({ <span class="hljs-attr">a</span>: <span class="hljs-number">2</span> }, <span class="hljs-literal">null</span>, <span class="hljs-string">" "</span>);
<span class="hljs-comment">/* "{
&nbsp;"a": 2
}"*/</span>
<span class="hljs-built_in">JSON</span>.stringify({ <span class="hljs-attr">a</span>: <span class="hljs-number">2</span> }, <span class="hljs-literal">null</span>, <span class="hljs-string">""</span>);
<span class="hljs-comment">// "{"a":2}"</span>
</code></pre>
<p data-nodeid="5514">从上面的代码中可以看到，增加第二个参数 replacer 带来的变化：通过替换方法把对象中的属性为字符串的过滤掉，在 stringify 之后返回的仅为数字的属性变成字符串之后的结果；当第三个参数传入的是多个空格的时候，则会增加结果字符串里面的间距数量，从最后一段代码中可以看到结果。</p>
<p data-nodeid="5515">下面我们再看下 JSON.stringify 的内部针对各种数据类型的转换方式。</p>
<h3 data-nodeid="5516">如何自己手动实现？</h3>
<p data-nodeid="5517">为了让你更好地理解实现的过程，请你回想一下“<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=601&amp;sid=20-h5Url-0#/detail/pc?id=6174" data-nodeid="5588">01 | 代码基本功测试（上）：JS 的数据类型你了解多少</a>”中的基本知识，我们当时讲了那么多种数据类型，如果它们都使用这个方法，返回的结果又会是怎么样的呢？</p>
<h4 data-nodeid="5518">分析各种数据类型及边界情况</h4>
<p data-nodeid="5519">我们来分析一下都有哪些数据类型传入，传入了之后会有什么返回，通过分析的结果我们之后才能更好地实现编码。大致的分析汇总如下表所示（可参考 MDN 文档）。</p>
<p data-nodeid="5520"><img src="https://s0.lgstatic.com/i/image/M00/90/40/Ciqc1GAKhuuASWc7AAHWTgdfPTc220.png" alt="Lark20210122-160329.png" data-nodeid="5594"></p>
<p data-nodeid="5521">上面这个表中，基本整理出了各种数据类型通过 JSON.stringify 这个方法之后返回对应的值，但是还有一个特殊情况需要注意：对于包含循环引用的对象（深拷贝那讲中也有提到）执行此方法，会抛出错误。</p>
<p data-nodeid="5522">那么根据上面梳理的这个表格，我们来一起看下代码怎么编写吧。</p>
<h4 data-nodeid="5523">代码逻辑实现</h4>
<p data-nodeid="5524">我们先利用 typeof 把基础数据类型和引用数据类型分开，分开之后再根据不同情况来分别处理不同的情况，按照这个逻辑代码实现如下。</p>
<pre class="lang-javascript" data-nodeid="5525"><code data-language="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">jsonStringify</span>(<span class="hljs-params">data</span>) </span>{
  <span class="hljs-keyword">let</span> type = <span class="hljs-keyword">typeof</span> data;

  <span class="hljs-keyword">if</span>(type !== <span class="hljs-string">'object'</span>) {
    <span class="hljs-keyword">let</span> result = data;
    <span class="hljs-comment">//data 可能是基础数据类型的情况在这里处理</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Number</span>.isNaN(data) || data === <span class="hljs-literal">Infinity</span>) {
       <span class="hljs-comment">//NaN 和 Infinity 序列化返回 "null"</span>
       result = <span class="hljs-string">"null"</span>;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (type === <span class="hljs-string">'function'</span> || type === <span class="hljs-string">'undefined'</span> || type === <span class="hljs-string">'symbol'</span>) {
      <span class="hljs-comment">// 由于 function 序列化返回 undefined，因此和 undefined、symbol 一起处理</span>
       <span class="hljs-keyword">return</span> <span class="hljs-literal">undefined</span>;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (type === <span class="hljs-string">'string'</span>) {
       result = <span class="hljs-string">'"'</span> + data + <span class="hljs-string">'"'</span>;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">String</span>(result);
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (type === <span class="hljs-string">'object'</span>) {
     <span class="hljs-keyword">if</span> (data === <span class="hljs-literal">null</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-string">"null"</span>  <span class="hljs-comment">// 第01讲有讲过 typeof null 为'object'的特殊情况</span>
     } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (data.toJSON &amp;&amp; <span class="hljs-keyword">typeof</span> data.toJSON === <span class="hljs-string">'function'</span>) {
        <span class="hljs-keyword">return</span> jsonStringify(data.toJSON());
     } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (data <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span>) {
        <span class="hljs-keyword">let</span> result = [];
        <span class="hljs-comment">//如果是数组，那么数组里面的每一项类型又有可能是多样的</span>
        data.forEach(<span class="hljs-function">(<span class="hljs-params">item, index</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> item === <span class="hljs-string">'undefined'</span> || <span class="hljs-keyword">typeof</span> item === <span class="hljs-string">'function'</span> || <span class="hljs-keyword">typeof</span> item === <span class="hljs-string">'symbol'</span>) {
               result[index] = <span class="hljs-string">"null"</span>;
           } <span class="hljs-keyword">else</span> {
               result[index] = jsonStringify(item);
           }
         });
         result = <span class="hljs-string">"["</span> + result + <span class="hljs-string">"]"</span>;
         <span class="hljs-keyword">return</span> result.replace(<span class="hljs-regexp">/'/g</span>, <span class="hljs-string">'"'</span>);
      } <span class="hljs-keyword">else</span> {
         <span class="hljs-comment">// 处理普通对象</span>
         <span class="hljs-keyword">let</span> result = [];
         <span class="hljs-built_in">Object</span>.keys(data).forEach(<span class="hljs-function">(<span class="hljs-params">item, index</span>) =&gt;</span> {
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> item !== <span class="hljs-string">'symbol'</span>) {
              <span class="hljs-comment">//key 如果是 symbol 对象，忽略</span>
              <span class="hljs-keyword">if</span> (data[item] !== <span class="hljs-literal">undefined</span> &amp;&amp; <span class="hljs-keyword">typeof</span> data[item] !== <span class="hljs-string">'function'</span> &amp;&amp; <span class="hljs-keyword">typeof</span> data[item] !== <span class="hljs-string">'symbol'</span>) {
                <span class="hljs-comment">//键值如果是 undefined、function、symbol 为属性值，忽略</span>
                result.push(<span class="hljs-string">'"'</span> + item + <span class="hljs-string">'"'</span> + <span class="hljs-string">":"</span> + jsonStringify(data[item]));
              }
            }
         });
         <span class="hljs-keyword">return</span> (<span class="hljs-string">"{"</span> + result + <span class="hljs-string">"}"</span>).replace(<span class="hljs-regexp">/'/g</span>, <span class="hljs-string">'"'</span>);
        }
    }
}
</code></pre>
<p data-nodeid="5526">手工实现一个 JSON.stringify 方法的基本代码如上面所示，有几个问题你还是需要注意一下：</p>
<ol data-nodeid="5527">
<li data-nodeid="5528">
<p data-nodeid="5529">由于 function 返回 'null'， 并且 typeof function 能直接返回精确的判断，故在整体逻辑处理基础数据类型的时候，会随着 undefined，symbol 直接处理了；</p>
</li>
<li data-nodeid="5530">
<p data-nodeid="5531">由于 01 讲说过 typeof null 的时候返回'object'，故 null 的判断逻辑整体在处理引用数据类型的逻辑里面；</p>
</li>
<li data-nodeid="5532">
<p data-nodeid="5533">关于引用数据类型中的数组，由于数组的每一项的数据类型又有很多的可能性，故在处理数组过程中又将 undefined，symbol，function 作为数组其中一项的情况做了特殊处理；</p>
</li>
<li data-nodeid="5534">
<p data-nodeid="5535">同样在最后处理普通对象的时候，key （键值）也存在和数组一样的问题，故又需要再针对上面这几种情况（undefined，symbol，function）做特殊处理；</p>
</li>
<li data-nodeid="5536">
<p data-nodeid="5537">最后在处理普通对象过程中，对于循环引用的问题暂未做检测，如果是有循环引用的情况，需要抛出 Error；</p>
</li>
<li data-nodeid="5538">
<p data-nodeid="5539">根据官方给出的 JSON.stringify 的第二个以及第三个参数的实现，本段模拟实现的代码并未实现，如果有兴趣你可以自己尝试一下。</p>
</li>
</ol>
<p data-nodeid="5540">整体来说这段代码还是比较复杂的，如果在面试过程中让你当场手写，其实整体还是需要考虑很多东西的。当然上面的代码根据每个人的思路不同，你也可以写出自己认为更优的代码，比如你也可以尝试直接使用 switch 语句，来分别针对特殊情况进行处理，整体写出来可能看起来会比上面的写法更清晰一些，这些可以根据自己情况而定。</p>
<h4 data-nodeid="5541">实现效果测试</h4>
<p data-nodeid="5542">上面的这个方法已经实现了，那么用起来会不会有问题呢？我们就用上面的代码，来进行一些用例的检测吧。</p>
<p data-nodeid="5543">上面自己实现的这个 jsonStringify 方法和真正的 JSON.stringify 想要得到的效果是否一样呢？请看下面的测试结果。</p>
<pre class="lang-javascript" data-nodeid="5544"><code data-language="javascript"><span class="hljs-keyword">let</span> nl = <span class="hljs-literal">null</span>;
<span class="hljs-built_in">console</span>.log(jsonStringify(nl) === <span class="hljs-built_in">JSON</span>.stringify(nl));
<span class="hljs-comment">// true</span>
<span class="hljs-keyword">let</span> und = <span class="hljs-literal">undefined</span>;
<span class="hljs-built_in">console</span>.log(jsonStringify(<span class="hljs-literal">undefined</span>) === <span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-literal">undefined</span>));
<span class="hljs-comment">// true</span>
<span class="hljs-keyword">let</span> boo = <span class="hljs-literal">false</span>;
<span class="hljs-built_in">console</span>.log(jsonStringify(boo) === <span class="hljs-built_in">JSON</span>.stringify(boo));
<span class="hljs-comment">// true</span>
<span class="hljs-keyword">let</span> nan = <span class="hljs-literal">NaN</span>;
<span class="hljs-built_in">console</span>.log(jsonStringify(nan) === <span class="hljs-built_in">JSON</span>.stringify(nan));
<span class="hljs-comment">// true</span>
<span class="hljs-keyword">let</span> inf = <span class="hljs-literal">Infinity</span>;
<span class="hljs-built_in">console</span>.log(jsonStringify(<span class="hljs-literal">Infinity</span>) === <span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-literal">Infinity</span>));
<span class="hljs-comment">// true</span>
<span class="hljs-keyword">let</span> str = <span class="hljs-string">"jack"</span>;
<span class="hljs-built_in">console</span>.log(jsonStringify(str) === <span class="hljs-built_in">JSON</span>.stringify(str));
<span class="hljs-comment">// true</span>
<span class="hljs-keyword">let</span> reg = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">"\w"</span>);
<span class="hljs-built_in">console</span>.log(jsonStringify(reg) === <span class="hljs-built_in">JSON</span>.stringify(reg));
<span class="hljs-comment">// true</span>
<span class="hljs-keyword">let</span> date = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
<span class="hljs-built_in">console</span>.log(jsonStringify(date) === <span class="hljs-built_in">JSON</span>.stringify(date));
<span class="hljs-comment">// true</span>
<span class="hljs-keyword">let</span> sym = <span class="hljs-built_in">Symbol</span>(<span class="hljs-number">1</span>);
<span class="hljs-built_in">console</span>.log(jsonStringify(sym) === <span class="hljs-built_in">JSON</span>.stringify(sym));
<span class="hljs-comment">// true</span>
<span class="hljs-keyword">let</span> array = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-built_in">console</span>.log(jsonStringify(array) === <span class="hljs-built_in">JSON</span>.stringify(array));
<span class="hljs-comment">// true</span>
<span class="hljs-keyword">let</span> obj = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'jack'</span>,
    <span class="hljs-attr">age</span>: <span class="hljs-number">18</span>,
    <span class="hljs-attr">attr</span>: [<span class="hljs-string">'coding'</span>, <span class="hljs-number">123</span>],
    <span class="hljs-attr">date</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(),
    <span class="hljs-attr">uni</span>: <span class="hljs-built_in">Symbol</span>(<span class="hljs-number">2</span>),
    <span class="hljs-attr">sayHi</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"hi"</span>)
    },
    <span class="hljs-attr">info</span>: {
        <span class="hljs-attr">sister</span>: <span class="hljs-string">'lily'</span>,
        <span class="hljs-attr">age</span>: <span class="hljs-number">16</span>,
        <span class="hljs-attr">intro</span>: {
            <span class="hljs-attr">money</span>: <span class="hljs-literal">undefined</span>,
            <span class="hljs-attr">job</span>: <span class="hljs-literal">null</span>
        }
    }
}
<span class="hljs-built_in">console</span>.log(jsonStringify(obj) === <span class="hljs-built_in">JSON</span>.stringify(obj));
<span class="hljs-comment">// true</span>
</code></pre>
<p data-nodeid="5545">通过上面这些测试的例子可以发现，我们自己实现的 jsonStringify 方法基本和 JSON.stringify 转换之后的结果是一样的，不难看出 jsonStringify 基本满足了预期结果。</p>
<p data-nodeid="5546">本讲的内容也就先介绍到这里。</p>
<h3 data-nodeid="5547">总结</h3>
<p data-nodeid="5548">这一讲，我利用原理结合实践的方式，带你实现了一个 JSON.stringify 的方法。从中你可以看到，要想自己实现一个 JSON.stringify 方法整体上来说并不容易，它依赖很多数据类型相关的知识点，而且还需要考虑各种边界情况。</p>
<p data-nodeid="5549">希望你多加实践，如果在面试中也让你当场实现一个 JSON.stringify 方法，你才能够轻松应对。</p>
<p data-nodeid="5550">另外，如果把本讲中的题目作为面试题的话，其实是对你的 JS 编码能力的一个很全面的考察，因此对于数据类型的相关知识还是很有必要系统性地学习，尤其是对于 JSON 的这两个方法，不常用的那几个参数你是否有了解？还有引用数据类型中对数组以及普通对象的处理，这部分手写起来会比基础数据类型复杂一些，在一些细节处理上会遇到问题。因此，你要好好理解。</p>
<p data-nodeid="5551" class="">那么讲到这里，第一个模块的内容就介绍完毕了，涉及数据类型相关的知识就暂时告一段落了，马上我们进入全新的第二个模块深入数组的学习。在后续的课时中，我将带领你深入学习 JS 的数组相关知识。我们下一讲再见~</p>

---

### 精选评论

##### **帆：
> 还有第33行 return result.replace(/'/g, '"') 的目的是什么呢？

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 把里面的单引号全局处理成双引号，统一一下返回的字符串result结果而已

##### **0406：
> 请问正则是在哪处理的呢？

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 没处理这种情况，你可以自己加上

##### **5476：
> 正则走的是普通object那一层逻辑，result 为 [] 结果与预期一致

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 是的

##### **帆：
> 代码逻辑实现第14行：else if (type === 'string') {}这一步是什么意思呢？这时data已经是个字符串了，为何前后还要再加一层双引号呢

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 当一个对象进行stringfy过程中，其中某个属性是字符串的时候，你可以看下面29行，它整体是个递归调用，当我说的这种情况出现的时候，这个属性的值虽然也是字符串，但是也需要拼接到result中去

##### **平：
> toJSON这个我在本地测试都直接报错呢

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; toJSON() 这个是可以在标准文档里查到的

##### **峰：
> 老师在第七行判断data === Infinity的时候缺了data === -Infinity的情况

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 这个可以加上

##### *强：
> 代码逻辑实现那部分，20和21行那里的toJSON有问题吧，只查到了是Date对象的一个方法。

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 对啊，上面Date的情况有在表格里写，你说的20和21行就是专门处理Date这种类型的

