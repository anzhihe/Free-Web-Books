<p data-nodeid="2084" class="">欢迎来到第二个模块“深入数组篇”的学习。</p>
<p data-nodeid="2085">JavaScript 数组的 API 经常会被 JS 开发者频繁使用，在整个 JavaScript 的学习过程中尤为重要。</p>
<p data-nodeid="2086">数组作为一个最基础的一维数据结构，在各种编程语言中都充当着至关重要的角色，你很难想象没有数组的编程语言会是什么模样。特别是 JavaScript，它天生的灵活性，又进一步发挥了数组的特长，丰富了数组的使用场景。<strong data-nodeid="2221">可以毫不夸张地说，不深入地了解数组，就不足以写好 JavaScript。</strong></p>
<p data-nodeid="2087">随着前端框架的不断演进，React 和 Vue 等 MVVM 框架的流行，数据更新的同时视图也会随之更新。在通过前端框架实现大量的业务代码中，开发者都会用数组来进行数据的存储和各种“增删改查”等操作，从而实现对应前端视图层的更新。可见熟练掌握数组各种方法，并深入了解数组是很有必要的。</p>
<p data-nodeid="2088">因此，我希望这一模块，能让你对数组有更深一步的理解，更加得心应手地运用数组的各种 API，并可以轻松实现面试中遇到的数组题目。</p>
<p data-nodeid="2089">据不完全统计，在 LeetCode 题库的 1800 多道题目中，和数组相关的题目是最多的，有 300 多道，例如“合并两个有序数组”“两个数组的交集”等。其中有个别题目是大厂的面试题目，如果你有兴趣可以自己尝试去解答，我也会在课程中穿插讲解其中的一些数组类题目，帮助你更好地理解这部分知识。</p>
<p data-nodeid="2090">那么，在课程开始前请你先思考几个问题。</p>
<ol data-nodeid="2091">
<li data-nodeid="2092">
<p data-nodeid="2093">数组的构造器有哪几种？</p>
</li>
<li data-nodeid="2094">
<p data-nodeid="2095">哪些是改变自身的方法？</p>
</li>
<li data-nodeid="2096">
<p data-nodeid="2097">哪些是不改变自身的方法？</p>
</li>
<li data-nodeid="2098">
<p data-nodeid="2099">遍历的方法有哪些？</p>
</li>
</ol>
<p data-nodeid="2100">不知道这几个问题你是否能够准确地回答出来？那么我们就带着以上几个思考，开始这一讲的学习。</p>
<h3 data-nodeid="2101">数组概念的探究</h3>
<p data-nodeid="2102">截至 ES7 规范，数组共包含 33 个标准的 API 方法和一个非标准的 API 方法，使用场景和使用方案纷繁复杂，其中还有不少坑。为了方便你可以循序渐进地学习这部分的内容，下面我将从数组的概念开始讲起。</p>
<p data-nodeid="2103">由于数组的 API 较多，很多相近的名字也容易导致混淆，所以在这里我按照“会改变自身值的”“不会改变自身值的”“遍历方法”这三种类型分开讲解，让你对这些 API 形成更结构化的认识。</p>
<h4 data-nodeid="2104">Array 的构造器</h4>
<p data-nodeid="2105">Array 构造器用于创建一个新的数组。通常，我们推荐使用对象字面量的方式创建一个数组，例如 var a = [] 就是一个比较好的写法。但是，总有对象字面量表述乏力的时候，比如，我想创建一个长度为 6 的空数组，用对象字面量的方式是无法创建的，因此只能写成下述代码这样。</p>
<pre class="lang-javascript" data-nodeid="2403"><code data-language="javascript"><span class="hljs-comment">// 使用 Array 构造器，可以自定义长度</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-built_in">Array</span>(<span class="hljs-number">6</span>); <span class="hljs-comment">// [empty × 6]</span>
<span class="hljs-comment">// 使用对象字面量</span>
<span class="hljs-keyword">var</span> b = [];
b.length = <span class="hljs-number">6</span>; <span class="hljs-comment">// [undefined × 6]</span>
</code></pre>

<p data-nodeid="2107" class="te-preview-highlight">Array 构造器根据参数长度的不同，有如下两种不同的处理方式：</p>
<ul data-nodeid="2108">
<li data-nodeid="2109">
<p data-nodeid="2110"><strong data-nodeid="2244">new Array(arg1, arg2,…)</strong>，参数长度为 0 或长度大于等于 2 时，传入的参数将按照顺序依次成为新数组的第 0 至第 N 项（参数长度为 0 时，返回空数组）；</p>
</li>
<li data-nodeid="2111">
<p data-nodeid="2112"><strong data-nodeid="2249">new Array(len)</strong>，当 len 不是数值时，处理同上，返回一个只包含 len 元素一项的数组；当 len 为数值时，len 最大不能超过 32 位无符号整型，即需要小于 2 的 32 次方（len 最大为 Math.pow(2,32)），否则将抛出 RangeError。</p>
</li>
</ul>
<p data-nodeid="2113">以上就是 Array 构造器的基本情况，我们来看下 ES6 新增的几个构造方法。</p>
<h4 data-nodeid="2114">ES6 新增的构造方法：Array.of 和 Array.from</h4>
<p data-nodeid="2115">鉴于数组的常用性，ES6 专门扩展了数组构造器 Array&nbsp;，新增了 2 个方法：Array.of、Array.from。其中，Array.of 整体用得比较少；而 Array.from 具有灵活性，你在平常开发中应该会经常使用。那么关于两者的使用细节你真的了解吗？下面展开来聊下这两个方法。</p>
<p data-nodeid="2116"><strong data-nodeid="2256">Array.of</strong></p>
<p data-nodeid="2117">Array.of 用于将参数依次转化为数组中的一项，然后返回这个新数组，而不管这个参数是数字还是其他。它基本上与 Array 构造器功能一致，唯一的区别就在单个数字参数的处理上。</p>
<p data-nodeid="2118">比如，在下面的这几行代码中，你可以看到区别：当参数为两个时，返回的结果是一致的；当参数是一个时，Array.of 会把参数变成数组里的一项，而构造器则会生成长度和第一个参数相同的空数组。</p>
<pre data-nodeid="2119"><code>Array.of(8.0); // [8]
Array(8.0); // [empty × 8]
Array.of(8.0, 5); // [8, 5]
Array(8.0, 5); // [8, 5]
Array.of('8'); // ["8"]
Array('8'); // ["8"]
</code></pre>
<p data-nodeid="2120"><strong data-nodeid="2262">Array.from</strong></p>
<p data-nodeid="2121">Array.from 的设计初衷是快速便捷地基于其他对象创建新数组，准确来说就是从一个类似数组的可迭代对象中创建一个新的数组实例。其实就是，只要一个对象有迭代器，Array.from 就能把它变成一个数组（注意：是返回新的数组，不改变原对象）。</p>
<p data-nodeid="2122">从语法上看，Array.from 拥有 3 个参数：</p>
<ol data-nodeid="2123">
<li data-nodeid="2124">
<p data-nodeid="2125">类似数组的对象，必选；</p>
</li>
<li data-nodeid="2126">
<p data-nodeid="2127">加工函数，新生成的数组会经过该函数的加工再返回；</p>
</li>
<li data-nodeid="2128">
<p data-nodeid="2129">this 作用域，表示加工函数执行时 this 的值。</p>
</li>
</ol>
<p data-nodeid="2130">这三个参数里面第一个参数是必选的，后两个参数都是可选的。我们通过一段代码来看看它的用法。</p>
<pre class="lang-javascript" data-nodeid="2131"><code data-language="javascript"><span class="hljs-keyword">var</span> obj = {<span class="hljs-number">0</span>: <span class="hljs-string">'a'</span>, <span class="hljs-number">1</span>: <span class="hljs-string">'b'</span>, <span class="hljs-number">2</span>:<span class="hljs-string">'c'</span>, <span class="hljs-attr">length</span>: <span class="hljs-number">3</span>};
<span class="hljs-built_in">Array</span>.from(obj, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value, index</span>)</span>{
  <span class="hljs-built_in">console</span>.log(value, index, <span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>.length);
  <span class="hljs-keyword">return</span> value.repeat(<span class="hljs-number">3</span>);   <span class="hljs-comment">//必须指定返回值，否则返回 undefined</span>
}, obj);
</code></pre>
<p data-nodeid="2132">结果如下图所示。<br>
<img src="https://s0.lgstatic.com/i/image2/M01/09/B2/CgpVE2APjSiAGLqXAAB5v09b2C4966.png" alt="WechatIMG13.png" data-nodeid="2273"></p>
<p data-nodeid="2133">结果中可以看出 console.log(value, index, this, arguments.length) 对应的四个值，并且看到 return 的 value 重复了三遍，最后返回的数组为 ["aaa","bbb","ccc"]。</p>
<p data-nodeid="2134">这表明了通过 Array.from 这个方法可以自己定义加工函数的处理方式，从而返回想要得到的值；如果不确定返回值，则会返回 undefined，最终生成的也是一个包含若干个 undefined 元素的空数组。</p>
<p data-nodeid="2135">实际上，如果这里不指定 this 的话，加工函数完全可以是一个箭头函数。上述代码可以简写为如下形式。</p>
<pre class="lang-javascript" data-nodeid="2136"><code data-language="javascript"><span class="hljs-built_in">Array</span>.from(obj, (value) =&gt; value.repeat(<span class="hljs-number">3</span>));
<span class="hljs-comment">// &nbsp;控制台返回 (3) ["aaa", "bbb", "ccc"]</span>
</code></pre>
<p data-nodeid="2137">除了上述 obj 对象以外，拥有迭代器的对象还包括 String、Set、Map&nbsp;等，Array.from 统统可以处理，请看下面的代码。</p>
<pre class="lang-javascript" data-nodeid="2138"><code data-language="javascript"><span class="hljs-comment">// String</span>
<span class="hljs-built_in">Array</span>.from(<span class="hljs-string">'abc'</span>);         <span class="hljs-comment">// ["a", "b", "c"]</span>
<span class="hljs-comment">// Set</span>
<span class="hljs-built_in">Array</span>.from(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-string">'abc'</span>, <span class="hljs-string">'def'</span>])); <span class="hljs-comment">// ["abc", "def"]</span>
<span class="hljs-comment">// Map</span>
<span class="hljs-built_in">Array</span>.from(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>([[<span class="hljs-number">1</span>, <span class="hljs-string">'ab'</span>], [<span class="hljs-number">2</span>, <span class="hljs-string">'de'</span>]])); 
<span class="hljs-comment">// [[1, 'ab'], [2, 'de']]</span>
</code></pre>
<p data-nodeid="2139">关于数组构造器 Array&nbsp;新增的两个方法就讲解到这，下面接着介绍如何进行 Array 的判断。</p>
<h4 data-nodeid="2140">Array 的判断</h4>
<p data-nodeid="2141">Array.isArray 用来判断一个变量是否为数组类型，我们在“<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=601#/detail/pc?id=6174" data-nodeid="2299">01 | 代码基本功测试（上）：JS 的数据类型你了解多少</a>”中也讲过如何判断数据类型，不过那时只是针对 JS 的所有数据类型做一个判断，数组的判断当时并未详细讲解，那么我们现在来学习一下。</p>
<p data-nodeid="2142">在 ES5 提供该方法之前，我们至少有如下 5 种方式去判断一个变量是否为数组。</p>
<pre class="lang-javascript" data-nodeid="2143"><code data-language="javascript"><span class="hljs-keyword">var</span> a = [];
<span class="hljs-comment">// 1.基于instanceof</span>
a <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span>;
<span class="hljs-comment">// 2.基于constructor</span>
a.constructor === <span class="hljs-built_in">Array</span>;
<span class="hljs-comment">// 3.基于Object.prototype.isPrototypeOf</span>
<span class="hljs-built_in">Array</span>.prototype.isPrototypeOf(a);
<span class="hljs-comment">// 4.基于getPrototypeOf</span>
<span class="hljs-built_in">Object</span>.getPrototypeOf(a) === <span class="hljs-built_in">Array</span>.prototype;
<span class="hljs-comment">// 5.基于Object.prototype.toString</span>
<span class="hljs-built_in">Object</span>.prototype.toString.apply(a) === <span class="hljs-string">'[object Array]'</span>;
</code></pre>
<p data-nodeid="2144">上面这 5 个判断全部为 True，这里应该没什么疑问。实际上，通过 Object.prototype.toString 去判断一个值的类型，也是模块一的 01 讲判断数据类型中我给你推荐的方法。</p>
<p data-nodeid="2145">ES6 之后新增了一个 Array.isArray 方法，能直接判断数据类型是否为数组，但是如果 isArray 不存在，那么 Array.isArray 的 polyfill 通常可以这样写：</p>
<pre class="lang-javascript" data-nodeid="2146"><code data-language="javascript"><span class="hljs-keyword">if</span> (!<span class="hljs-built_in">Array</span>.isArray){
  <span class="hljs-built_in">Array</span>.isArray = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">arg</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(arg) === <span class="hljs-string">'[object Array]'</span>;
  };
}
</code></pre>
<p data-nodeid="2147">数组的基本概念到这里基本讲得差不多了，下面我们就来看看让人眼花缭乱的 30 多个数组的基本方法。</p>
<h3 data-nodeid="2148">改变自身的方法</h3>
<p data-nodeid="2149">基于 ES6，会改变自身值的方法一共有 9 个，分别为 pop、push、reverse、shift、sort、splice、unshift，以及两个 ES6 新增的方法 copyWithin 和 fill。</p>
<p data-nodeid="2150">接下来我们看一段代码，快速了解这些方法最基本的用法。</p>
<pre class="lang-javascript" data-nodeid="2151"><code data-language="javascript"><span class="hljs-comment">// pop方法</span>
<span class="hljs-keyword">var</span> array = [<span class="hljs-string">"cat"</span>, <span class="hljs-string">"dog"</span>, <span class="hljs-string">"cow"</span>, <span class="hljs-string">"chicken"</span>, <span class="hljs-string">"mouse"</span>];
<span class="hljs-keyword">var</span> item = array.pop();
<span class="hljs-built_in">console</span>.log(array); <span class="hljs-comment">// ["cat", "dog", "cow", "chicken"]</span>
<span class="hljs-built_in">console</span>.log(item); <span class="hljs-comment">// mouse</span>
<span class="hljs-comment">// push方法</span>
<span class="hljs-keyword">var</span> array = [<span class="hljs-string">"football"</span>, <span class="hljs-string">"basketball"</span>,  <span class="hljs-string">"badminton"</span>];
<span class="hljs-keyword">var</span> i = array.push(<span class="hljs-string">"golfball"</span>);
<span class="hljs-built_in">console</span>.log(array); 
<span class="hljs-comment">// ["football", "basketball", "badminton", "golfball"]</span>
<span class="hljs-built_in">console</span>.log(i); <span class="hljs-comment">// 4</span>
<span class="hljs-comment">// reverse方法</span>
<span class="hljs-keyword">var</span> array = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>];
<span class="hljs-keyword">var</span> array2 = array.reverse();
<span class="hljs-built_in">console</span>.log(array); <span class="hljs-comment">// [5,4,3,2,1]</span>
<span class="hljs-built_in">console</span>.log(array2===array); <span class="hljs-comment">// true</span>
<span class="hljs-comment">// shift方法</span>
<span class="hljs-keyword">var</span> array = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>];
<span class="hljs-keyword">var</span> item = array.shift();
<span class="hljs-built_in">console</span>.log(array); <span class="hljs-comment">// [2,3,4,5]</span>
<span class="hljs-built_in">console</span>.log(item); <span class="hljs-comment">// 1</span>
<span class="hljs-comment">// unshift方法</span>
<span class="hljs-keyword">var</span> array = [<span class="hljs-string">"red"</span>, <span class="hljs-string">"green"</span>, <span class="hljs-string">"blue"</span>];
<span class="hljs-keyword">var</span> length = array.unshift(<span class="hljs-string">"yellow"</span>);
<span class="hljs-built_in">console</span>.log(array); <span class="hljs-comment">// ["yellow", "red", "green", "blue"]</span>
<span class="hljs-built_in">console</span>.log(length); <span class="hljs-comment">// 4</span>
<span class="hljs-comment">// sort方法</span>
<span class="hljs-keyword">var</span> array = [<span class="hljs-string">"apple"</span>,<span class="hljs-string">"Boy"</span>,<span class="hljs-string">"Cat"</span>,<span class="hljs-string">"dog"</span>];
<span class="hljs-keyword">var</span> array2 = array.sort();
<span class="hljs-built_in">console</span>.log(array); <span class="hljs-comment">// ["Boy", "Cat", "apple", "dog"]</span>
<span class="hljs-built_in">console</span>.log(array2 == array); <span class="hljs-comment">// true</span>
<span class="hljs-comment">// splice方法</span>
<span class="hljs-keyword">var</span> array = [<span class="hljs-string">"apple"</span>,<span class="hljs-string">"boy"</span>];
<span class="hljs-keyword">var</span> splices = array.splice(<span class="hljs-number">1</span>,<span class="hljs-number">1</span>);
<span class="hljs-built_in">console</span>.log(array); <span class="hljs-comment">// ["apple"]</span>
<span class="hljs-built_in">console</span>.log(splices); <span class="hljs-comment">// ["boy"]</span>
<span class="hljs-comment">// copyWithin方法</span>
<span class="hljs-keyword">var</span> array = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>]; 
<span class="hljs-keyword">var</span> array2 = array.copyWithin(<span class="hljs-number">0</span>,<span class="hljs-number">3</span>);
<span class="hljs-built_in">console</span>.log(array===array2,array2);  <span class="hljs-comment">// true [4, 5, 3, 4, 5]</span>
<span class="hljs-comment">// fill方法</span>
<span class="hljs-keyword">var</span> array = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>];
<span class="hljs-keyword">var</span> array2 = array.fill(<span class="hljs-number">10</span>,<span class="hljs-number">0</span>,<span class="hljs-number">3</span>);
<span class="hljs-built_in">console</span>.log(array===array2,array2); 
<span class="hljs-comment">// true [10, 10, 10, 4, 5], 可见数组区间[0,3]的元素全部替换为10</span>
</code></pre>
<p data-nodeid="2152">我希望你能通过上面的代码，对这些方法形成一个直观的印象，并且能自己进行一定的实践来加深印象。不过上面的 sort() 方法的内涵比较多，在第 11 讲我会专门讲解，这里先不做过多的介绍了。</p>
<p data-nodeid="2153">下面为了让你对这些 API 方法有更深刻的印象，我结合 Leetcode 中的第 88 题 《合并两个有序数组》，带你看下如何利用数组的多个改变自身的方法来解决这道题，题目是这样的：</p>
<pre class="lang-java" data-nodeid="2154"><code data-language="java">给你两个有序整数数组&nbsp;nums1&nbsp;和&nbsp;nums2，请你将&nbsp;nums2&nbsp;合并到&nbsp;nums1&nbsp;中，使&nbsp;nums1&nbsp;成为一个有序数组。
输入:
nums1 = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>]； m = <span class="hljs-number">3</span>
nums2 = [<span class="hljs-number">2</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]；&nbsp; &nbsp; &nbsp; &nbsp;n = <span class="hljs-number">3</span>
输出: [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]
</code></pre>
<p data-nodeid="2155">你可以仔细看下题目要求：</p>
<ul data-nodeid="2156">
<li data-nodeid="2157">
<p data-nodeid="2158">首先是将 nums2 合并到 nums1 里面，不新开数组，否则将无法通过；</p>
</li>
<li data-nodeid="2159">
<p data-nodeid="2160">其次是合并完了之后 nums1 还是一个有序数组，这里也是需要注意的；</p>
</li>
<li data-nodeid="2161">
<p data-nodeid="2162">另外样例里面 nums1 和 nums2 都有“2”这个数，也都需要将重复的合并进去。</p>
</li>
</ul>
<p data-nodeid="2163">我们看上面这三点，可以思考下，既然要求不能新开数组，那么就需要利用数组改变自身的方法完成这个题目，应该怎么做呢？你可以试着先将想法写下来，之后再来看我提供的答案。</p>
<p data-nodeid="2164">答案就是巧妙地利用数组的 API 中的 splice、push、sort 这三个方法，在原数组上进行操作，最终完成如下代码：</p>
<pre class="lang-javascript" data-nodeid="2165"><code data-language="javascript"><span class="hljs-keyword">var</span>&nbsp;merge&nbsp;=&nbsp;<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">nums1,&nbsp;m,&nbsp;nums2,&nbsp;n</span>)&nbsp;</span>{
&nbsp;&nbsp;&nbsp;&nbsp;nums1.splice(m);
&nbsp;&nbsp;&nbsp;&nbsp;nums2.splice(n);
&nbsp;&nbsp;&nbsp;&nbsp;nums1.push(...nums2);
&nbsp;&nbsp;&nbsp;&nbsp;nums1.sort(<span class="hljs-function">(<span class="hljs-params">a,b</span>)&nbsp;=&gt;</span>&nbsp;a - b);  <span class="hljs-comment">// nums1从小到大排列，所以是a-b</span>
};
</code></pre>
<p data-nodeid="2166">我上面提供的这段代码是可以在 LeetCode 88 题提交 AC 通过的，没写出来的话你可以试着再敲一遍，最后提交完成通过。</p>
<p data-nodeid="2167">改变数组自身的 9 个方法理解起来并不复杂，只要你对上面这些代码理解了，并且多加实践就够了，因此就讲解到这里。下面我们再来看看那些不改变自身的方法都是怎么使用的。</p>
<h3 data-nodeid="2168">不改变自身的方法</h3>
<p data-nodeid="2169">基于 ES7，不会改变自身的方法也有 9 个，分别为 concat、join、slice、toString、toLocaleString、indexOf、lastIndexOf、未形成标准的 toSource，以及 ES7 新增的方法 includes。</p>
<p data-nodeid="2170">我们还是通过代码，快速了解这些方法的最基本用法。</p>
<pre class="lang-javascript" data-nodeid="2171"><code data-language="javascript"><span class="hljs-comment">// concat方法</span>
<span class="hljs-keyword">var</span> array = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
<span class="hljs-keyword">var</span> array2 = array.concat(<span class="hljs-number">4</span>,[<span class="hljs-number">5</span>,<span class="hljs-number">6</span>],[<span class="hljs-number">7</span>,<span class="hljs-number">8</span>,<span class="hljs-number">9</span>]);
<span class="hljs-built_in">console</span>.log(array2); <span class="hljs-comment">// [1, 2, 3, 4, 5, 6, 7, 8, 9]</span>
<span class="hljs-built_in">console</span>.log(array); <span class="hljs-comment">// [1, 2, 3], 可见原数组并未被修改</span>
<span class="hljs-comment">// join方法</span>
<span class="hljs-keyword">var</span> array = [<span class="hljs-string">'We'</span>, <span class="hljs-string">'are'</span>, <span class="hljs-string">'Chinese'</span>];
<span class="hljs-built_in">console</span>.log(array.join()); <span class="hljs-comment">// "We,are,Chinese"</span>
<span class="hljs-built_in">console</span>.log(array.join(<span class="hljs-string">'+'</span>)); <span class="hljs-comment">// "We+are+Chinese"</span>
<span class="hljs-comment">// slice方法</span>
<span class="hljs-keyword">var</span> array = [<span class="hljs-string">"one"</span>, <span class="hljs-string">"two"</span>, <span class="hljs-string">"three"</span>,<span class="hljs-string">"four"</span>, <span class="hljs-string">"five"</span>];
<span class="hljs-built_in">console</span>.log(array.slice()); <span class="hljs-comment">// ["one", "two", "three","four", "five"]</span>
<span class="hljs-built_in">console</span>.log(array.slice(<span class="hljs-number">2</span>,<span class="hljs-number">3</span>)); <span class="hljs-comment">// ["three"]</span>
<span class="hljs-comment">// toString方法</span>
<span class="hljs-keyword">var</span> array = [<span class="hljs-string">'Jan'</span>, <span class="hljs-string">'Feb'</span>, <span class="hljs-string">'Mar'</span>, <span class="hljs-string">'Apr'</span>];
<span class="hljs-keyword">var</span> str = array.toString();
<span class="hljs-built_in">console</span>.log(str); <span class="hljs-comment">// Jan,Feb,Mar,Apr</span>
<span class="hljs-comment">// tolocalString方法</span>
<span class="hljs-keyword">var</span> array= [{<span class="hljs-attr">name</span>:<span class="hljs-string">'zz'</span>}, <span class="hljs-number">123</span>, <span class="hljs-string">"abc"</span>, <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()];
<span class="hljs-keyword">var</span> str = array.toLocaleString();
<span class="hljs-built_in">console</span>.log(str); <span class="hljs-comment">// [object Object],123,abc,2016/1/5 下午1:06:23</span>
<span class="hljs-comment">// indexOf方法</span>
<span class="hljs-keyword">var</span> array = [<span class="hljs-string">'abc'</span>, <span class="hljs-string">'def'</span>, <span class="hljs-string">'ghi'</span>,<span class="hljs-string">'123'</span>];
<span class="hljs-built_in">console</span>.log(array.indexOf(<span class="hljs-string">'def'</span>)); <span class="hljs-comment">// 1</span>
<span class="hljs-comment">// includes方法</span>
<span class="hljs-keyword">var</span> array = [<span class="hljs-number">-0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>];
<span class="hljs-built_in">console</span>.log(array.includes(+<span class="hljs-number">0</span>)); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(array.includes(<span class="hljs-number">1</span>)); <span class="hljs-comment">// true</span>
<span class="hljs-keyword">var</span> array = [<span class="hljs-literal">NaN</span>];
<span class="hljs-built_in">console</span>.log(array.includes(<span class="hljs-literal">NaN</span>)); <span class="hljs-comment">// true</span>
</code></pre>
<p data-nodeid="2172">上面我把不会改变数组的几个方法大致做了一个回顾，其中 includes 方法需要注意的是，如果元素中有 0，那么在判断过程中不论是 +0 还是 -0 都会判断为 True，这里的 includes 忽略了 +0 和 -0。</p>
<p data-nodeid="2173">另外还有一个值得强调的是<strong data-nodeid="2344">slice 不改变自身，而 splice 会改变自身</strong>，你还是需要注意不要记错了。其中，slice 的语法是：arr.slice([start[, end]])，而 splice 的语法是：arr.splice(start,deleteCount[, item1[, item2[, …]]])。我们可以看到从第二个参数开始，二者就已经有区别了，splice 第二个参数是删除的个数，而 slice 的第二个参数是 end 的坐标（可选）。</p>
<p data-nodeid="2174">此外，lastIndexOf 和 indexOf 基本功能差不多，不过 lastIndexOf 是从后面寻找元素的下标；而 toSource 方法还未形成标准，因此在这里不做过多介绍了。</p>
<p data-nodeid="2175">不改变数组自身的 9 个方法到这里也基本回顾差不多了，下面我们接着看看数组遍历的方法都是怎么用的。</p>
<h3 data-nodeid="2176">数组遍历的方法</h3>
<p data-nodeid="2177">基于 ES6，不会改变自身的遍历方法一共有 12 个，分别为 forEach、every、some、filter、map、reduce、reduceRight，以及 ES6 新增的方法 entries、find、findIndex、keys、values。</p>
<p data-nodeid="2178">我们还是先看一段代码，快速了解它们的基本用法。</p>
<pre class="lang-javascript" data-nodeid="2179"><code data-language="javascript"><span class="hljs-comment">// forEach方法</span>
<span class="hljs-keyword">var</span> array = [<span class="hljs-number">1</span>, <span class="hljs-number">3</span>, <span class="hljs-number">5</span>];
<span class="hljs-keyword">var</span> obj = {<span class="hljs-attr">name</span>:<span class="hljs-string">'cc'</span>};
<span class="hljs-keyword">var</span> sReturn = array.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value, index, array</span>)</span>{
  array[index] = value;
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name); <span class="hljs-comment">// cc被打印了三次, this指向obj</span>
},obj);
<span class="hljs-built_in">console</span>.log(array); <span class="hljs-comment">// [1, 3, 5]</span>
<span class="hljs-built_in">console</span>.log(sReturn); <span class="hljs-comment">// undefined, 可见返回值为undefined</span>
<span class="hljs-comment">// every方法</span>
<span class="hljs-keyword">var</span> o = {<span class="hljs-number">0</span>:<span class="hljs-number">10</span>, <span class="hljs-number">1</span>:<span class="hljs-number">8</span>, <span class="hljs-number">2</span>:<span class="hljs-number">25</span>, <span class="hljs-attr">length</span>:<span class="hljs-number">3</span>};
<span class="hljs-keyword">var</span> bool = <span class="hljs-built_in">Array</span>.prototype.every.call(o,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value, index, obj</span>)</span>{
  <span class="hljs-keyword">return</span> value &gt;= <span class="hljs-number">8</span>;
},o);
<span class="hljs-built_in">console</span>.log(bool); <span class="hljs-comment">// true</span>
<span class="hljs-comment">// some方法</span>
<span class="hljs-keyword">var</span> array = [<span class="hljs-number">18</span>, <span class="hljs-number">9</span>, <span class="hljs-number">10</span>, <span class="hljs-number">35</span>, <span class="hljs-number">80</span>];
<span class="hljs-keyword">var</span> isExist = array.some(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value, index, array</span>)</span>{
&nbsp; <span class="hljs-keyword">return</span> value &gt; <span class="hljs-number">20</span>;
});
<span class="hljs-built_in">console</span>.log(isExist); <span class="hljs-comment">// true </span>
<span class="hljs-comment">// map 方法</span>
<span class="hljs-keyword">var</span> array = [<span class="hljs-number">18</span>, <span class="hljs-number">9</span>, <span class="hljs-number">10</span>, <span class="hljs-number">35</span>, <span class="hljs-number">80</span>];
array.map(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> item + <span class="hljs-number">1</span>);
<span class="hljs-built_in">console</span>.log(array);  <span class="hljs-comment">// [19, 10, 11, 36, 81]</span>
<span class="hljs-comment">// filter 方法</span>
<span class="hljs-keyword">var</span> array = [<span class="hljs-number">18</span>, <span class="hljs-number">9</span>, <span class="hljs-number">10</span>, <span class="hljs-number">35</span>, <span class="hljs-number">80</span>];
<span class="hljs-keyword">var</span> array2 = array.filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value, index, array</span>)</span>{
  <span class="hljs-keyword">return</span> value &gt; <span class="hljs-number">20</span>;
});
<span class="hljs-built_in">console</span>.log(array2); <span class="hljs-comment">// [35, 80]</span>
<span class="hljs-comment">// reduce方法</span>
<span class="hljs-keyword">var</span> array = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>];
<span class="hljs-keyword">var</span> s = array.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">previousValue, value, index, array</span>)</span>{
  <span class="hljs-keyword">return</span> previousValue * value;
},<span class="hljs-number">1</span>);
<span class="hljs-built_in">console</span>.log(s); <span class="hljs-comment">// 24</span>
<span class="hljs-comment">// ES6写法更加简洁</span>
array.reduce(<span class="hljs-function">(<span class="hljs-params">p, v</span>) =&gt;</span> p * v); <span class="hljs-comment">// 24</span>
<span class="hljs-comment">// reduceRight方法 (和reduce的区别就是从后往前累计)</span>
<span class="hljs-keyword">var</span> array = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>];
array.reduceRight(<span class="hljs-function">(<span class="hljs-params">p, v</span>) =&gt;</span> p * v); <span class="hljs-comment">// 24</span>
<span class="hljs-comment">// entries方法</span>
<span class="hljs-keyword">var</span> array = [<span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>, <span class="hljs-string">"c"</span>];
<span class="hljs-keyword">var</span> iterator = array.entries();
<span class="hljs-built_in">console</span>.log(iterator.next().value); <span class="hljs-comment">// [0, "a"]</span>
<span class="hljs-built_in">console</span>.log(iterator.next().value); <span class="hljs-comment">// [1, "b"]</span>
<span class="hljs-built_in">console</span>.log(iterator.next().value); <span class="hljs-comment">// [2, "c"]</span>
<span class="hljs-built_in">console</span>.log(iterator.next().value); <span class="hljs-comment">// undefined, 迭代器处于数组末尾时, 再迭代就会返回undefined</span>
<span class="hljs-comment">// find &amp; findIndex方法</span>
<span class="hljs-keyword">var</span> array = [<span class="hljs-number">1</span>, <span class="hljs-number">3</span>, <span class="hljs-number">5</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>, <span class="hljs-number">10</span>];
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params">value, index, array</span>)</span>{
  <span class="hljs-keyword">return</span> value%<span class="hljs-number">2</span>==<span class="hljs-number">0</span>;     <span class="hljs-comment">// 返回偶数</span>
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f2</span>(<span class="hljs-params">value, index, array</span>)</span>{
  <span class="hljs-keyword">return</span> value &gt; <span class="hljs-number">20</span>;     <span class="hljs-comment">// 返回大于20的数</span>
}
<span class="hljs-built_in">console</span>.log(array.find(f)); <span class="hljs-comment">// 8</span>
<span class="hljs-built_in">console</span>.log(array.find(f2)); <span class="hljs-comment">// undefined</span>
<span class="hljs-built_in">console</span>.log(array.findIndex(f)); <span class="hljs-comment">// 4</span>
<span class="hljs-built_in">console</span>.log(array.findIndex(f2)); <span class="hljs-comment">// -1</span>
<span class="hljs-comment">// keys方法</span>
[...Array(<span class="hljs-number">10</span>).keys()];     <span class="hljs-comment">// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]</span>
[...new <span class="hljs-built_in">Array</span>(<span class="hljs-number">10</span>).keys()]; <span class="hljs-comment">// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]</span>
<span class="hljs-comment">// values方法</span>
<span class="hljs-keyword">var</span> array = [<span class="hljs-string">"abc"</span>, <span class="hljs-string">"xyz"</span>];
<span class="hljs-keyword">var</span> iterator = array.values();
<span class="hljs-built_in">console</span>.log(iterator.next().value);<span class="hljs-comment">//abc</span>
<span class="hljs-built_in">console</span>.log(iterator.next().value);<span class="hljs-comment">//xyz</span>
</code></pre>
<p data-nodeid="2180">其中，要注意有些遍历方法不会返回处理之后的数组，比如 forEach；有些方法会返回处理之后的数组，比如 filter。这个细节你需要牢记，这样才会在面试过程中正确作答。</p>
<p data-nodeid="2181">reduce 方法也需要重点关注，其参数复杂且多，通常一些复杂的逻辑处理，其实使用 reduce 很容易就可以解决。我们重点看一下，reduce 到底能解决什么问题呢？先看下 reduce 的两个参数。</p>
<p data-nodeid="2182">首先是 callback（一个在数组的每一项中调用的函数，接受四个参数）：</p>
<ol data-nodeid="2183">
<li data-nodeid="2184">
<p data-nodeid="2185">previousValue（上一次调用回调函数时的返回值，或者初始值）</p>
</li>
<li data-nodeid="2186">
<p data-nodeid="2187">currentValue（当前正在处理的数组元素）</p>
</li>
<li data-nodeid="2188">
<p data-nodeid="2189">currentIndex（当前正在处理的数组元素下标）</p>
</li>
<li data-nodeid="2190">
<p data-nodeid="2191">array（调用 reduce() 方法的数组）</p>
</li>
</ol>
<p data-nodeid="2192">然后是 initialValue（可选的初始值，作为第一次调用回调函数时传给 previousValue 的值）。</p>
<p data-nodeid="2193">光靠文字描述其实看着会比较懵，我们还是通过一个例子来说明 reduce 的功能到底有多么强大。</p>
<pre class="lang-javascript" data-nodeid="2194"><code data-language="javascript"><span class="hljs-comment">/* 题目：数组 arr = [1,2,3,4] 求数组的和：*/</span>
<span class="hljs-comment">// 第一种方法：</span>
<span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>];
<span class="hljs-keyword">var</span> sum = <span class="hljs-number">0</span>;
arr.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{sum += e;}); <span class="hljs-comment">// sum = 10</span>
<span class="hljs-comment">//&nbsp;第二种方法</span>
<span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>];
<span class="hljs-keyword">var</span> sum = <span class="hljs-number">0</span>;
arr.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>)</span>{sum += obj});
<span class="hljs-comment">//&nbsp;第三种方法</span>
<span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>];
arr.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">pre,cur</span>)</span>{<span class="hljs-keyword">return</span> pre + cur});
</code></pre>
<p data-nodeid="2195">从上面代码可以看出，我们分别用了 forEach 和 map 都能实现数组的求和，其中需要另外新定义一个变量 sum，再进行累加求和，最后再来看 sum 的值，而 reduce 不仅可以少定义一个变量，而且也会直接返回最后累加的结果，是不是问题就可以轻松解决了？</p>
<p data-nodeid="2196">那么我们结合一道题目来看看 reduce 怎么用。</p>
<p data-nodeid="2197"><strong data-nodeid="2380">题目：</strong> var arr = [ {name: 'brick1'}, {name: 'brick2'}, {name: 'brick3'} ]</p>
<p data-nodeid="2198">希望最后返回到 arr 里面每个对象的 name 拼接数据为 'brick1, brick2 &amp; brick3' ，如果用 reduce 如何实现呢？</p>
<pre class="lang-javascript" data-nodeid="2199"><code data-language="javascript"><span class="hljs-keyword">var</span> arr =  [ {<span class="hljs-attr">name</span>: <span class="hljs-string">'one'</span>}, {<span class="hljs-attr">name</span>: <span class="hljs-string">'two'</span>}, {<span class="hljs-attr">name</span>: <span class="hljs-string">'three'</span>} ];
arr.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">prev, current, index, array</span>)</span>{
  <span class="hljs-keyword">if</span> (index === <span class="hljs-number">0</span>){
    <span class="hljs-keyword">return</span> current.name;
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (index === array.length - <span class="hljs-number">1</span>){
    <span class="hljs-keyword">return</span> prev + <span class="hljs-string">' &amp; '</span> + current.name;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> prev + <span class="hljs-string">', '</span> + current.name;
  }
}, <span class="hljs-string">''</span>);
<span class="hljs-comment">// 返回结果 "one, two &amp; three"</span>
</code></pre>
<p data-nodeid="2200">从上面的答案也可以看出来，用 reduce 就能很轻松地对数组进行遍历，然后进行一些复杂的累加处理操作即可。<br>
到这里，数组遍历的方法也基本讲解差不多了，这一讲也将告一段落。</p>
<h3 data-nodeid="2201">总结</h3>
<p data-nodeid="2202">下面我将令人“眼花缭乱”的数组的基础 API 简单做了个总结表格，方便你更清晰地回顾本课时所讲的内容。</p>
<p data-nodeid="2203"><img src="https://s0.lgstatic.com/i/image2/M01/09/CC/Cip5yGAP1k2ACVqpAAE5zFVPD7o375.png" alt="Lark20210126-164334.png" data-nodeid="2395"></p>
<p data-nodeid="2204">以上，数组的各方法基本讲解完毕，这些方法之间存在很多共性，如下：</p>
<ul data-nodeid="2205">
<li data-nodeid="2206">
<p data-nodeid="2207">所有插入元素的方法，比如 push、unshift 一律返回数组新的长度；</p>
</li>
<li data-nodeid="2208">
<p data-nodeid="2209">所有删除元素的方法，比如 pop、shift、splice 一律返回删除的元素，或者返回删除的多个元素组成的数组；</p>
</li>
<li data-nodeid="2210">
<p data-nodeid="2211">部分遍历方法，比如 forEach、every、some、filter、map、find、findIndex，它们都包含 function(value,index,array){}&nbsp;和&nbsp;thisArg&nbsp;这样两个形参。</p>
</li>
</ul>
<p data-nodeid="2212">在日常的前端开发工作中，开发者往往会忽视对数组 API 方法的系统性学习，但其实因为数组的方法较多，每个方法的参数和细节也比较零散，很多开发者很难有一个系统的、整体的认识，在开发过程中还要频繁地查询 MDN 文档，造成效率低下以及代码能力难以进一步提升等问题。</p>
<p data-nodeid="2213">因此我希望通过这一讲的学习，你能很好地掌握数组的 API 方法，以便在开发中规避我所说的这些问题。</p>
<p data-nodeid="2214" class="">在后续的课程中，我将继续带领你尝试一些数组 API 方法的手工实现。同时希望你多动手练习以熟练使用所学的知识点，也欢迎你在下方留言讨论自己在学习过程中遇到的困惑，以及学习感悟等，让我们共同进步。</p>

---

### 精选评论

##### *亚：
> // 使用 Array 构造器，可以自定义长度var a = Array(6); // [undefined × 6]这里应该是【empty × 6】,empty表示是空位，undefined也是一种数据类型

##### **6184：
> // map 方法
var array = [18, 9, 10, 35, 80];
array.map(item = item + 1);
console.log(array);  // [19, 10, 11, 36, 81]这里写错了吧？map是返回一个新数组不改变原数组的。应该是[18, 9, 10, 35, 80]

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 上面有说遍历的时候不会改变数组的，但是直接map会返回一个每个都加一的数组，我后面的注释是想表达这个，让你们感觉又错误了

##### **开发：
> 'Array.from 的设计初衷是快速便捷地基于其他对象创建新数组，准确来说就是从一个类似数组的可迭代对象中创建一个新的数组实例。'这句话是不是不太对啊，可迭代对象要求部署了Symbol.iterator接口，下面例子中的obj对象不是具备这样的条件

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 你可能还是没太理解iterator

##### **北：
> 改变自身的例题中，splice （m）传入一个参数是什么意思呀🤔

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 这个基本的api你可以自己查一下学习一下呢，比较基础

##### *浩：
> 老师总结的很到位，很全面。

##### *峰：
> 测试了下，Array.from({length: 3}) 也是可以获得新数组的。这么看的话入参不一定要有Symbol.iterator？

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 是的

##### **6605：
> mdn上copyWithin说不会改变原数组长度

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; var array = [1,2,3,4,5]; 
var array2 = array.copyWithin(0,3);
console.log(array===array2,array2);

##### **帆：
> 楼上说的对，会产生一个 hole Arrary 没有位置都是 empty

