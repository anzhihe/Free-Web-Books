<p data-nodeid="4941" class="">我在上一讲介绍了继承的概念，同时你也可以看到，其中综合使用了 new、apply 以及 call 的方法，那么这一讲我们就围绕这几个方法进行更深入的讲解，以便于你清楚这几个核心方法的实现思路，更好地去理解继承的原理。</p>
<p data-nodeid="4942">JavaScript 中的 apply、call 和 bind 方法是前端代码开发中相当重要的概念，并且与 this 的指向密切相关。很多人对它们的理解还比较浅显，如果你想拥有扎实的 JavaScript 编程基础，那么必须要了解这些基础常用的方法。希望通过这一讲的学习，你可以彻底掌握它们。</p>
<p data-nodeid="4943">为了方便你更好地理解本讲的内容，在课程开始前请你先思考几个问题：</p>
<ol data-nodeid="4944">
<li data-nodeid="4945">
<p data-nodeid="4946">用什么样的思路可以 new 关键词？</p>
</li>
<li data-nodeid="4947">
<p data-nodeid="4948">apply、call、bind 这三个方法之间有什么区别?</p>
</li>
<li data-nodeid="4949">
<p data-nodeid="4950">怎样实现一个 apply 或者 call 的方法？</p>
</li>
</ol>
<p data-nodeid="4951">带着这几个思考，我们开始本课时的学习吧。</p>
<h3 data-nodeid="4952">方法的基本介绍</h3>
<h4 data-nodeid="4953">new 原理介绍</h4>
<p data-nodeid="4954">new 关键词的主要作用就是执行一个构造函数、返回一个实例对象，在 new 的过程中，根据构造函数的情况，来确定是否可以接受参数的传递。下面我们通过一段代码来看一个简单的 new 的例子。</p>
<pre class="lang-javascript" data-nodeid="4955"><code data-language="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>)</span>{
   <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'Jack'</span>;
}
<span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> Person(); 
<span class="hljs-built_in">console</span>.log(p.name)  <span class="hljs-comment">// Jack</span>
</code></pre>
<p data-nodeid="4956">这段代码比较容易理解，从输出结果可以看出，p 是一个通过 person 这个构造函数生成的一个实例对象，这个应该很容易理解。那么 new 在这个生成实例的过程中到底进行了哪些步骤来实现呢？总结下来大致分为以下几个步骤。</p>
<ol data-nodeid="4957">
<li data-nodeid="4958">
<p data-nodeid="4959">创建一个新对象；</p>
</li>
<li data-nodeid="4960">
<p data-nodeid="4961">将构造函数的作用域赋给新对象（this 指向新对象）；</p>
</li>
<li data-nodeid="4962">
<p data-nodeid="4963">执行构造函数中的代码（为这个新对象添加属性）；</p>
</li>
<li data-nodeid="4964">
<p data-nodeid="4965">返回新对象。</p>
</li>
</ol>
<p data-nodeid="4966">那么问题来了，如果不用 new 这个关键词，结合上面的代码改造一下，去掉 new，会发生什么样的变化呢？我们再来看下面这段代码。</p>
<pre class="lang-javascript" data-nodeid="4967"><code data-language="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'Jack'</span>;
}
<span class="hljs-keyword">var</span> p = Person();
<span class="hljs-built_in">console</span>.log(p) <span class="hljs-comment">// undefined</span>
<span class="hljs-built_in">console</span>.log(name) <span class="hljs-comment">// Jack</span>
<span class="hljs-built_in">console</span>.log(p.name) <span class="hljs-comment">// 'name' of undefined</span>
</code></pre>
<p data-nodeid="4968">从上面的代码中可以看到，我们没有使用 new 这个关键词，返回的结果就是 undefined。其中由于 JavaScript 代码在默认情况下 this 的指向是 window，那么 name 的输出结果就为 Jack，这是一种不存在 new 关键词的情况。</p>
<p data-nodeid="4969">那么当构造函数中有 return 一个对象的操作，结果又会是什么样子呢？我们再来看一段在上面的基础上改造过的代码。</p>
<pre class="lang-javascript" data-nodeid="4970"><code data-language="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>)</span>{
   <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'Jack'</span>; 
   <span class="hljs-keyword">return</span> {<span class="hljs-attr">age</span>: <span class="hljs-number">18</span>}
}
<span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> Person(); 
<span class="hljs-built_in">console</span>.log(p)  <span class="hljs-comment">// {age: 18}</span>
<span class="hljs-built_in">console</span>.log(p.name) <span class="hljs-comment">// undefined</span>
<span class="hljs-built_in">console</span>.log(p.age) <span class="hljs-comment">// 18</span>
</code></pre>
<p data-nodeid="4971">通过这段代码又可以看出，当构造函数最后 return 出来的是一个和 this 无关的对象时，new 命令会直接返回这个新对象，而不是通过 new 执行步骤生成的 this 对象。</p>
<p data-nodeid="4972">但是这里要求构造函数必须是返回一个对象，如果返回的不是对象，那么还是会按照 new 的实现步骤，返回新生成的对象。接下来还是在上面这段代码的基础之上稍微改动一下。</p>
<pre class="lang-javascript" data-nodeid="4973"><code data-language="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>)</span>{
   <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'Jack'</span>; 
   <span class="hljs-keyword">return</span> <span class="hljs-string">'tom'</span>;
}
<span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> Person(); 
<span class="hljs-built_in">console</span>.log(p)  <span class="hljs-comment">// {name: 'Jack'}</span>
<span class="hljs-built_in">console</span>.log(p.name) <span class="hljs-comment">// Jack</span>
</code></pre>
<p data-nodeid="4974">可以看出，当构造函数中 return 的不是一个对象时，那么它还是会根据 new 关键词的执行逻辑，生成一个新的对象（绑定了最新 this），最后返回出来。</p>
<p data-nodeid="4975">因此我们总结一下：new 关键词执行之后总是会返回一个对象，要么是实例对象，要么是 return 语句指定的对象。</p>
<p data-nodeid="4976"><img src="https://s0.lgstatic.com/i/image/M00/8E/0F/CgqCHmABa_qAP_2zAAVBMulvP2U718.png" alt="刘烨的js.png" data-nodeid="5069"></p>
<p data-nodeid="4977">好了，new 这个关键词内容基本就讲到这里了，我们再看一下 apply 和 call 的基本原理。</p>
<h4 data-nodeid="4978">apply &amp; call &amp; bind 原理介绍</h4>
<p data-nodeid="4979">先来了解一下这三个方法的基本情况，call、apply 和 bind 是挂在 Function 对象上的三个方法，调用这三个方法的必须是一个函数。</p>
<p data-nodeid="4980">请看这三个函数的基本语法。</p>
<pre class="lang-javascript" data-nodeid="4981"><code data-language="javascript">func.call(thisArg, param1, param2, ...)
func.apply(thisArg, [param1,param2,...])
func.bind(thisArg, param1, param2, ...)
</code></pre>
<p data-nodeid="4982">其中 func 是要调用的函数，thisArg 一般为 this 所指向的对象，后面的 param1、2 为函数 func 的多个参数，如果 func 不需要参数，则后面的 param1、2 可以不写。</p>
<p data-nodeid="4983">这三个方法共有的、比较明显的作用就是，都可以改变函数 func 的 this 指向。call 和 apply 的区别在于，传参的写法不同：apply 的第 2 个参数为数组； call 则是从第 2 个至第 N 个都是给 func 的传参；而 bind 和这两个（call、apply）又不同，bind 虽然改变了 func 的 this 指向，但不是马上执行，而这两个（call、apply）是在改变了函数的 this 指向之后立马执行。</p>
<p data-nodeid="4984">这几个方法的区别和原理基本讲清楚了，但是理解起来是不是很抽象呢？那么我举个形象的例子再配合着代码一起看下。</p>
<p data-nodeid="4985">例如，生活中我不经常做饭，家里没有锅，周末突然想给自己做个饭尝尝。但是家里没有锅，而我又不想出去买，所以就问隔壁邻居借了一个锅来用，这样做了饭，又节省了开销，一举两得。</p>
<p data-nodeid="4986">对应在程序中：A 对象有个 getName 的方法，B 对象也需要临时使用同样的方法，那么这时候我们是单独为 B 对象扩展一个方法，还是借用一下 A 对象的方法呢？当然是可以借用 A 对象的 getName 方法，既达到了目的，又节省重复定义，节约内存空间。</p>
<p data-nodeid="4987">为了更好地掌握这部分概念，我们结合一段代码再深入理解一下这几个方法。</p>
<pre class="lang-javascript" data-nodeid="4988"><code data-language="javascript"><span class="hljs-keyword">let</span> a = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'jack'</span>,
  <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>) </span>{
    <span class="hljs-keyword">return</span> msg + <span class="hljs-keyword">this</span>.name;
  } 
}
<span class="hljs-keyword">let</span> b = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'lily'</span>
}
<span class="hljs-built_in">console</span>.log(a.getName(<span class="hljs-string">'hello~'</span>));  <span class="hljs-comment">// hello~jack</span>
<span class="hljs-built_in">console</span>.log(a.getName.call(b, <span class="hljs-string">'hi~'</span>));  <span class="hljs-comment">// hi~lily</span>
<span class="hljs-built_in">console</span>.log(a.getName.apply(b, [<span class="hljs-string">'hi~'</span>]))  <span class="hljs-comment">// hi~lily</span>
<span class="hljs-keyword">let</span> name = a.getName.bind(b, <span class="hljs-string">'hello~'</span>);
<span class="hljs-built_in">console</span>.log(name());  <span class="hljs-comment">// hello~lily</span>
</code></pre>
<p data-nodeid="4989">从上面的代码执行的结果中可以发现，使用这三种方式都可以达成我们想要的目标，即通过改变 this 的指向，让 b 对象可以直接使用 a 对象中的 getName 方法。从结果中可以看到，最后三个方法输出的都是和 lily 相关的打印结果，满足了我们的预期。</p>
<p data-nodeid="4990">关于这三个方法的原理相关先介绍到这里，我们再看看这几个方法的使用场景。</p>
<h3 data-nodeid="4991">方法的应用场景</h3>
<p data-nodeid="4992">下面几种应用场景，你多加体会就可以发现它们的理念都是“借用”方法的思路。我们来看看都有哪些。</p>
<h4 data-nodeid="4993">判断数据类型</h4>
<p data-nodeid="4994">用 Object.prototype.toString 来判断类型是最合适的，借用它我们几乎可以判断所有类型的数据，我在 <a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=601#/detail/pc?id=6174" data-nodeid="5092">01 讲数据类型的判断</a>中有介绍过，我将当时总结的用来判断数据类型的那部分代码粘贴在下面了，你可以回忆一下。</p>
<pre class="lang-javascript" data-nodeid="4995"><code data-language="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getType</span>(<span class="hljs-params">obj</span>)</span>{
  <span class="hljs-keyword">let</span> type  = <span class="hljs-keyword">typeof</span> obj;
  <span class="hljs-keyword">if</span> (type !== <span class="hljs-string">"object"</span>) {
    <span class="hljs-keyword">return</span> type;
  }
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(obj).replace(<span class="hljs-regexp">/^$/</span>, <span class="hljs-string">'$1'</span>);
}
</code></pre>
<p data-nodeid="4996">结合上面这段代码，以及在前面讲的 call 的方法的 “借用” 思路，那么判断数据类型就是借用了 Object 的原型链上的 toString 方法，最后返回用来判断传入的 obj 的字符串，来确定最后的数据类型，这里就不再多做讲解了。</p>
<h4 data-nodeid="4997">类数组借用方法</h4>
<p data-nodeid="4998">类数组相关知识我会在第二个模块“深入数组”中详细介绍，这里先简单说一下，类数组因为不是真正的数组，所有没有数组类型上自带的种种方法，所以我们就可以利用一些方法去借用数组的方法，比如借用数组的 push 方法，看下面的一段代码。</p>
<pre class="lang-javascript" data-nodeid="4999"><code data-language="javascript"><span class="hljs-keyword">var</span> arrayLike = { 
  <span class="hljs-number">0</span>: <span class="hljs-string">'java'</span>,
  <span class="hljs-number">1</span>: <span class="hljs-string">'script'</span>,
  <span class="hljs-attr">length</span>: <span class="hljs-number">2</span>
} 
<span class="hljs-built_in">Array</span>.prototype.push.call(arrayLike, <span class="hljs-string">'jack'</span>, <span class="hljs-string">'lily'</span>); 
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> arrayLike); <span class="hljs-comment">// 'object'</span>
<span class="hljs-built_in">console</span>.log(arrayLike);
<span class="hljs-comment">// {0: "java", 1: "script", 2: "jack", 3: "lily", length: 4}</span>
</code></pre>
<p data-nodeid="5000">从上面的代码可以看到，arrayLike 是一个对象，模拟数组的一个类数组。从数据类型上看，它是一个对象。从上面的代码中可以看出，用 typeof 来判断输出的是 'object'，它自身是不会有数组的 push 方法的，这里我们就用 call 的方法来借用 Array 原型链上的 push 方法，可以实现一个类数组的 push 方法，给 arrayLike 添加新的元素。</p>
<p data-nodeid="5001">从上面的控制台可以看出，push 满足了我们想要实现添加元素的诉求。</p>
<h4 data-nodeid="5002">获取数组的最大 / 最小值</h4>
<p data-nodeid="5003">我们可以用 apply 来实现数组中判断最大 / 最小值，apply 直接传递数组作为调用方法的参数，也可以减少一步展开数组，可以直接使用 Math.max、Math.min 来获取数组的最大值 / 最小值，请看下面这段代码。</p>
<pre class="lang-javascript" data-nodeid="5004"><code data-language="javascript"><span class="hljs-keyword">let</span> arr = [<span class="hljs-number">13</span>, <span class="hljs-number">6</span>, <span class="hljs-number">10</span>, <span class="hljs-number">11</span>, <span class="hljs-number">16</span>];
<span class="hljs-keyword">const</span> max = <span class="hljs-built_in">Math</span>.max.apply(<span class="hljs-built_in">Math</span>, arr); 
<span class="hljs-keyword">const</span> min = <span class="hljs-built_in">Math</span>.min.apply(<span class="hljs-built_in">Math</span>, arr);
 
<span class="hljs-built_in">console</span>.log(max);  <span class="hljs-comment">// 16</span>
<span class="hljs-built_in">console</span>.log(min);  <span class="hljs-comment">// 6</span>
</code></pre>
<h4 data-nodeid="5005">继承</h4>
<p data-nodeid="5006">我们在上一讲中说到了继承，它与 new、call 共同实现了各种各样的继承方式。那么下面我们结合着这一讲的内容再来回顾一下组合继承方式，代码如下。</p>
<pre class="lang-javascript" data-nodeid="5007"><code data-language="javascript">  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent3</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'parent3'</span>;
    <span class="hljs-keyword">this</span>.play = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
  }

  Parent3.prototype.getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
  }
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Child3</span>(<span class="hljs-params"></span>) </span>{
    Parent3.call(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.type = <span class="hljs-string">'child3'</span>;
  }

  Child3.prototype = <span class="hljs-keyword">new</span> Parent3();
  Child3.prototype.constructor = Child3;
  <span class="hljs-keyword">var</span> s3 = <span class="hljs-keyword">new</span> Child3();
  <span class="hljs-built_in">console</span>.log(s3.getName());  <span class="hljs-comment">// 'parent3'</span>
</code></pre>
<p data-nodeid="5008">关于继承的内容在这里就不过多讲解了，另外这些方法类似的应用场景还有很多，关键在于它们借用方法的理念，如果对这部分内容不理解的话，你可以再多看几遍。</p>
<h3 data-nodeid="5009">如何自己实现这些方法</h3>
<p data-nodeid="5010">在互联网大厂的面试中，手写实现 new、call、apply、bind 一直是比较高频的题目，结合本讲的内容，我们一起来手工实现一下这几个方法。</p>
<h4 data-nodeid="5011">new 的实现</h4>
<p data-nodeid="5012">我们刚才在讲 new 的原理时，介绍了执行 new 的过程。那么来看下在这过程中，new 被调用后大致做了哪几件事情。</p>
<ol data-nodeid="5013">
<li data-nodeid="5014">
<p data-nodeid="5015">让实例可以访问到私有属性；</p>
</li>
<li data-nodeid="5016">
<p data-nodeid="5017">让实例可以访问构造函数原型（constructor.prototype）所在原型链上的属性；</p>
</li>
<li data-nodeid="5018">
<p data-nodeid="5019">构造函数返回的最后结果是引用数据类型。</p>
</li>
</ol>
<p data-nodeid="5020">那么请你思考一下，自己实现 new 的代码应该如何写呢？下面我给你一个思路。</p>
<pre class="lang-javascript te-preview-highlight" data-nodeid="5140"><code data-language="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_new</span>(<span class="hljs-params">ctor, ...args</span>) </span>{
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> ctor !== <span class="hljs-string">'function'</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-string">'ctor must be a function'</span>;
    }
    <span class="hljs-keyword">let</span> obj = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
    obj.__proto__ = <span class="hljs-built_in">Object</span>.create(ctor.prototype);
    <span class="hljs-keyword">let</span> res = ctor.apply(obj,  [...args]);

    <span class="hljs-keyword">let</span> isObject = <span class="hljs-keyword">typeof</span> res === <span class="hljs-string">'object'</span> &amp;&amp; res !== <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">let</span> isFunction = <span class="hljs-keyword">typeof</span> res === <span class="hljs-string">'function'</span>;
    <span class="hljs-keyword">return</span> isObject || isFunction ? res : obj;
};
</code></pre>

<p data-nodeid="5022">接下来我们再看看 apply 和 call 的实现方法。</p>
<h4 data-nodeid="5023">apply 和 call 的实现</h4>
<p data-nodeid="5024">由于 apply 和 call 基本原理是差不多的，只是参数存在区别，因此我们将这两个的实现方法放在一起讲。</p>
<p data-nodeid="5025">依然是结合方法“借用”的原理，我们一起来思考一下这两个方法如何实现，请看下面实现的代码。</p>
<pre class="lang-javascript" data-nodeid="5026"><code data-language="javascript"><span class="hljs-built_in">Function</span>.prototype.call = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">context, ...args</span>) </span>{
  <span class="hljs-keyword">var</span> context = context || <span class="hljs-built_in">window</span>;
  context.fn = <span class="hljs-keyword">this</span>;
  <span class="hljs-keyword">var</span> result = <span class="hljs-built_in">eval</span>(<span class="hljs-string">'context.fn(...args)'</span>);
  <span class="hljs-keyword">delete</span> context.fn
  <span class="hljs-keyword">return</span> result;
}
<span class="hljs-built_in">Function</span>.prototype.apply = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">context, args</span>) </span>{
  <span class="hljs-keyword">let</span> context = context || <span class="hljs-built_in">window</span>;
  context.fn = <span class="hljs-keyword">this</span>;
  <span class="hljs-keyword">let</span> result = <span class="hljs-built_in">eval</span>(<span class="hljs-string">'context.fn(...args)'</span>);
  <span class="hljs-keyword">delete</span> context.fn
  <span class="hljs-keyword">return</span> result;
}
</code></pre>
<p data-nodeid="5027">从上面的代码可以看出，实现 call 和 apply 的关键就在 eval 这行代码。其中显示了用 context 这个临时变量来指定上下文，然后还是通过执行 eval 来执行 context.fn 这个函数，最后返回 result。</p>
<p data-nodeid="5028">要注意这两个方法和 bind 的区别就在于，这两个方法是直接返回执行结果，而 bind 方法是返回一个函数，因此这里直接用 eval 执行得到结果。</p>
<p data-nodeid="5029">如果让你去执行，这个区别一定要多加注意。紧接着我们就来看下 bind 的实现。</p>
<h4 data-nodeid="5030">bind 的实现</h4>
<p data-nodeid="5031">结合上面两个方法的实现，bind 的实现思路基本和 apply 一样，但是在最后实现返回结果这里，bind 和 apply 有着比较大的差异，bind 不需要直接执行，因此不再需要用 eval ，而是需要通过返回一个函数的方式将结果返回，之后再通过执行这个结果，得到想要的执行效果。</p>
<p data-nodeid="5032">那么，结合这个思路，我们看下 bind 这个方法的底层逻辑实现的代码是什么样的，如下所示。</p>
<pre class="lang-javascript" data-nodeid="5033"><code data-language="javascript"><span class="hljs-built_in">Function</span>.prototype.bind = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">context, ...args</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">this</span> !== <span class="hljs-string">"function"</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"this must be a function"</span>);
    }
    <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">var</span> fbound = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        self.apply(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> self ? <span class="hljs-keyword">this</span> : context, args.concat(<span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>)));
    }
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.prototype) {
      fbound.prototype = <span class="hljs-built_in">Object</span>.create(<span class="hljs-keyword">this</span>.prototype);
    }
    <span class="hljs-keyword">return</span> fbound;
}
</code></pre>
<p data-nodeid="5034">从上面的代码中可以看到，实现 bind 的核心在于返回的时候需要返回一个函数，故这里的 fbound 需要返回，但是在返回的过程中原型链对象上的属性不能丢失。因此这里需要用Object.create 方法，将 this.prototype 上面的属性挂到 fbound 的原型上面，最后再返回 fbound。这样调用 bind 方法接收到函数的对象，再通过执行接收的函数，即可得到想要的结果。</p>
<p data-nodeid="5035">那么讲到这里，你是不是已经清楚了 new、apply、call、bind 这些方法是如何实现的呢？如果还是一知半解，我建议你多动手实践几次。</p>
<h3 data-nodeid="5036">总结</h3>
<p data-nodeid="5037">这一讲的内容就介绍完了。我们通过原理以及对底层逻辑的剖析，介绍了日常开发中经常用的 new、apply、call、bind 这几种方法，最后带你一起动手进行了实践。</p>
<p data-nodeid="5038">综上，我们可以看到这几个方法是有区别和联系的，通过下面的表格我们再来梳理一下这些方法的异同点，希望你可以更好地理解。</p>
<p data-nodeid="5039"><img src="https://s0.lgstatic.com/i/image/M00/8E/04/Ciqc1GABa-2AO2DlAAD5wuBLNn8120.png" alt="图片5.png" data-nodeid="5133"></p>
<p data-nodeid="5040">在日常的前端开发工作中，大家往往会忽视对这些方法的系统性学习，其实这些方法在高级 JavaScript 编程中经常出现，尤其是你去看一些比较好的开源项目，经常会通过“借用”的方式去复用已有的方法，来节约内存、优化代码。</p>
<p data-nodeid="5041">而且这些方法的底层逻辑的实现，在互联网大厂的前端面试中出现的频率也比较高，每个实现的方法细节也比较零散，很多开发者很难有一个系统的、整体的学习，造成了在面试过程中遇到此类手写底层 API 等问题时，容易临场发怵。</p>
<p data-nodeid="5042">因此我希望通过这一讲的学习，你能很好地掌握这部分内容，以便在面试中遇到这类题目的时候能够轻松应对。</p>
<p data-nodeid="5043">在后续的课时中，我将继续带领你深入挖掘闭包的原理和底层知识。同时希望你多动手练习以熟练上面的代码，也欢迎你在下方留言讨论自己在学习过程中遇到的困惑，以及学习感悟等，让我们共同进步。</p>
<p data-nodeid="5044" class="">我们下一课时再见~</p>

---

### 精选评论

##### *峰：
> obj.__proto__ = Object.create(ctor.prototype); 老师这个obj.__proto__是不是改成obj比较合理，new操作符生成实例对象obj的__proto__（Object.getProrotypeof(obj)）应该是和ctor.prototype相等， 如果上面的赋值对象是obj.__proto__，产生的效果就是：obj.__proto__.__proto__ === ctor.prototype

##### **侯：
> 研究了一天，现在 es6 里面已经可以用...来解构参数的了，不需要使用 eval 来传入多个参数了

##### **超：
> call 实现中 context.fn 可以会覆盖 context 中的fn属性，建议用Symbol 处理一下const fn = Symbol('fn');context[fn] = this;

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 这么做的好处是？

##### **华：
> 你们看不懂吃力是正常的 这是高级进阶的知识点

##### **峰：
> 手写bind中，判断this instanceof self的目的是？

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 分两种情况：
当这个绑定函数被当做普通函数调用的时候，可以直接用context；
而返回的这个之后当做构造函数使用的时候，却是指向这个实例，所以this instanceof self为true时，要用this。
因此这里加了这个判断。

##### **斌：
> 感觉解析的不是很清楚, 实现 call 中这里为什么要用 eval 没有解释， 看得不是很懂

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 首先，你需要先仔细学一下eval函数；其次，使用eval函数会帮我们进行了处理，隐藏执行了等效于 toString() 的操作，你要知道从上面传过来的参数是需要作为 context.fn 这个函数的参数一次性执行完成的，这里传进来如果参数是数组的话也是不能直接作为参数传递给 context.fn 的，因此通过 eval 函数把他们全部变成字符串作为要执行的函数的参数传进来进行执行的。最后要是还是不理解的话可以看下这两点：[1,2,3].toString() 在控制台输出的结果是什么？另外再理解一下 eval 这个函数的作用。

##### **斌：
> 写的很好，要多次学习

##### *曦：
> new的实现里调用了new？

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 自己手工模拟new的实现思路而已，中间是需要有一个新的object来承接

##### **冰：
> myBind 的 fbound 是不是少了 reTurn

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 里面有return啊

##### console_man：
> 这门儿课太火啦，我也留言一个

 ###### &nbsp;&nbsp;&nbsp; 编辑回复：
> &nbsp;&nbsp;&nbsp; 看到你啦！

##### **6704：
> bind之后作用域还是没有改变let moudle1={x:23,getX:function(a){returnthis.x}}//undefined没有指向指定的作用域

##### **雨：
> this instanceof self 这里应该是this instanceof fBound吧，这里加入instanceof就是为了判断是否使用new操作符来调用的_new

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 是的

##### **林：
> 在实践call的时候，有个疑问，代码如下：const pay = 'WeChatpay'；function showType () { console.log('pay type:', this.pay)}showType.call();按照以上代码执行后打印出来的是undefined将const改var就可以顺利输出，改为let也不行，不是很明白，还望老师能百忙之中能抽身解惑

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 可以看下第6讲的开头，有讲作用域的问题，let属于块级作用域，你这里的this指向的是window全局作用域，因此var的变量的话可以找到

##### **曦：
> 实现new方法的第9行代码是不是有错误，应该是res !== null，而不是typeof res !== null

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; typeof可以去了

##### Eleven's regret：
> 最后的bind有两个地方没看懂，一个是为啥要做this instanceof self判断，另一个是最后挂载原型的时候为什么要做if(this.prototype)判断？

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 在特殊情况下.prototype会缺失

##### **安：
> 老师，call方法没有改变this指向的操作呀，是为什么

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 有改变呀，不知道你说的哪里

##### **2914：
> eval可以用new Function()代替

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 是的

##### *俊：
> 学到很多

##### *聪：
> call和applay的实现，如果传入的context是基础类型呢？这个没有处理

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 可以加个临界判断

##### *鹏：
> call和apply重写下面eval这里可以不用eval吗，直接用context.fn(...args) 应该也能得到想要的结果把，毕竟是context调用的fn，里面的 this 上下文指向的也就是 context，好像问题也不大eval('context.fn(...args)')

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 可以不用

##### *苒：
> 老师你好，请求实现call和apply处的代码中，context.fn = this; 具体是做了什么，这行代码不能理解。

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 其实就拿context.fn 接收一下this，在下面的代码中方便拿这个context.fn函数直接进行执行

##### **华：
> let a = { name: 'jack', getName: function(msg) { } let b = { name: 'lily' }为什么用上面写的bind执行后结果是undefined啊，用原生的bind可以得到正常结果？

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 代码不全， 不太好回答哦

##### **辉：
> if (typeof this !== "function") { }为什么call和apply的时候没有这个判断呢

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 这个不需要

##### **的小叶酱：
> new的实现中 返回值可能是一个function类型，能举个例子吗

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 主要是看res是什么类型，它如果是函数就返回函数，它如果是对象就返回对象

##### **亚：
> 老师，call和apply的实现，直接调用context.fn(...arg)就可以吧，不需要用eval执行吧

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 是的，可以不要

##### **平：
> 不需要eval也可以，我直接这样Function.prototype.myCall = function (context, ...args) {  context = context || window;  context.fn = this;  context.fn(...args)  delete context.fn;}

##### **1240：
> var fbound = function () { }老师这个地方是不是忘记return了呢？return

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 后面已经return了呀

##### **广：
> 讲的真好，老哥辛苦了

##### **0461：
> this instanceof self ? this
bind的底层实现代码中这一行怎么理解？

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 分两种情况：
当这个绑定函数被当做普通函数调用的时候，可以直接用context；
而返回的这个之后当做构造函数使用的时候，却是指向这个实例，所以this instanceof self为true时，要用this。
因此这里加了这个判断。

##### **帆：
> call 的 eval 我也研究了好久，现在好像确实不需要了。还是对 eval 详细研究下吧。

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 可以不用了

##### **雨：
> _new方法。let isObject = typeof res === 'object' 。是不是应该为let isObject = typeof res === 'object'  res !== null 。这里typeof就是object，另外吐槽一下留言居然没法保存格式

 ###### &nbsp;&nbsp;&nbsp; 编辑回复：
> &nbsp;&nbsp;&nbsp; 技术小哥正在全力赶工

##### **0707：
> 老师，在实现call时，我认为如果用了...args，就没有必要用eval了

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 可以不用了

##### **帆：
> 老师 有一个地方不明白，实现bind函数的时候 self.apply(this instanceof self ? this : context, args.concat(Array.prototype.slice.call(arguments))); apply方法的第一个参数为什么要根据this来确定，为什么不是第一个参数直接写context？

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 分两种情况：
当这个绑定函数被当做普通函数调用的时候，可以直接用context；
而返回的这个之后当做构造函数使用的时候，却是指向这个实例，所以this instanceof self为true时，要用this。
因此这里加了这个判断。

##### **斌：
> 老哥你好，我看了你的留言，说实现 call 这里使用 eval 是为了把数组参数 ...args 转行成 1,2,3 这种字符串参数的形式，但是context.fn(...args) ，代码结果好像没有什么区别，请老哥解答下？

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 有了扩展运算符之后，eval可以去了，留着也不影响

##### **曦：
> 老师好，实现call时不通过eval，直接把函数复制一份可以么？Function.prototype._call = function (context, ...args) {    context = context || window    // 复制函数    context._call_interim_fn = new Function(`return ${this}`)()    // 执行    const result = context._call_interim_fn(...args)    // 删除临时属性    delete context._call_interim_fn    return result}

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 首先，你需要先仔细学一下eval函数；其次，使用eval函数会帮我们进行了处理，隐藏执行了等效于 toString() 的操作，你要知道从上面传过来的参数是需要作为 context.fn 这个函数的参数一次性执行完成的，这里传进来如果参数是数组的话也是不能直接作为参数传递给 context.fn 的，因此通过 eval 函数把他们全部变成字符串作为要执行的函数的参数传进来进行执行的。最后要是还是不理解的话可以看下这两点：[1,2,3].toString() 在控制台输出的结果是什么？另外再理解一下 eval 这个函数的作用。

##### **智：
> bind的源码中，fbound函数内要return出来

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 已经return了呀

##### **智：
> call,apply的源码中，为啥不直接执行context.fn(..args), 而是要用eval呢

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 首先，你需要先仔细学一下eval函数；其次，使用eval函数会帮我们进行了处理，隐藏执行了等效于 toString() 的操作，你要知道从上面传过来的参数是需要作为 context.fn 这个函数的参数一次性执行完成的，这里传进来如果参数是数组的话也是不能直接作为参数传递给 context.fn 的，因此通过 eval 函数把他们全部变成字符串作为要执行的函数的参数传进来进行执行的。最后要是还是不理解的话可以看下这两点：[1,2,3].toString() 在控制台输出的结果是什么？另外再理解一下 eval 这个函数的作用。

##### *前：
> 666

##### **婷：
> 有个bug，在new实现的时候，this指向并赋值时，let res = ctor.apply(obj,args)应该写成这样

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 效果是一样的

##### *涛：
> call 和 apply 的实现为什么要用eval 呢？直接执行里面的代码是不是也可以

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 首先，你需要先仔细学一下eval函数；其次，使用eval函数会帮我们进行了处理，隐藏执行了等效于 toString() 的操作，你要知道从上面传过来的参数是需要作为 context.fn 这个函数的参数一次性执行完成的，这里传进来如果参数是数组的话也是不能直接作为参数传递给 context.fn 的，因此通过 eval 函数把他们全部变成字符串作为要执行的函数的参数传进来进行执行的。最后要是还是不理解的话可以看下这两点：[1,2,3].toString() 在控制台输出的结果是什么？另外再理解一下 eval 这个函数的作用。

##### **峰：
> call apply的时候为什么要使用eval来执行，可以解释一下吗！ 应该可以直接执行吧

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 首先，你需要先仔细学一下eval函数；其次，使用eval函数会帮我们进行了处理，隐藏执行了等效于 toString() 的操作，你要知道从上面传过来的参数是需要作为 context.fn 这个函数的参数一次性执行完成的，这里传进来如果参数是数组的话也是不能直接作为参数传递给 context.fn 的，因此通过 eval 函数把他们全部变成字符串作为要执行的函数的参数传进来进行执行的。最后要是还是不理解的话可以看下这两点：[1,2,3].toString() 在控制台输出的结果是什么？另外再理解一下 eval 这个函数的作用。

##### *洪：
> 有一点没有懂，为啥要使用eval函数来执行，和直接执行context.fn(...args)有什么区别？

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 首先，你需要先仔细学一下eval函数；其次，使用eval函数会帮我们进行了处理，隐藏执行了等效于 toString() 的操作，你要知道从上面传过来的参数是需要作为 context.fn 这个函数的参数一次性执行完成的，这里传进来如果参数是数组的话也是不能直接作为参数传递给 context.fn 的，因此通过 eval 函数把他们全部变成字符串作为要执行的函数的参数传进来进行执行的。最后要是还是不理解的话可以看下这两点：[1,2,3].toString() 在控制台输出的结果是什么？另外再理解一下 eval 这个函数的作用。

##### *佳：
> Child3.prototype.constructor = Child3;这句话什么意思？原型的构造函数为他本身？怎么理解？继承把我搞得懵了。怎么看不懂这些代码？应该补基础知识了，是吗？还是对js原型根本没有理解？

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 推荐再去自学一下constructor

##### *佳：
> Parent3.call(this);的作用是什么？

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 推荐再去自学一下call

##### **伟：
> 系统查漏补缺

