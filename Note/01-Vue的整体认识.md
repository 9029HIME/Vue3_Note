# 数据绑定

## 前提

**本段参考Vue_01/00-Precondition.html**

Vue的本质是允许采用简洁的模板语法来声明式地将数据渲染进DOM的框架。Vue的宗旨是：数据（Model）绑定视图（View），形成ViewModel，通过修改ViewModel，从而影响视图，至于这个修改行为，则由事件触发，即我们编写的JS或TS代码。

对于Vue来说，有两个关键概念：Vue应用 与 视图模型。在引入Vue的依赖后，可以通过：

```html
<script src="https://unpkg.com/vue@next"></script>
<script>
    const dataObj = {
                data() {
                    return {
                        data1: 1,
                        data2: 2
                    }
                },
                methods: {
                    method1() {
                        console.log("method1")
                    },
                    method2() {
                        console.log("method2")
                    }
                }
            };
    var demoApp = Vue.createApp(dataObj);
</script>
```

创建一个名叫demoApp的应用，这个应用基于一个名叫dataObj的对象创建，可以把dataObj视为数据（Model），数据（Model）由多个property构成，这里只展示了其中两个：data() 与 methods。分别代表dataObj里面承载的`实际数据`与`方法`。

dataObj给予demoApp数据的能力，但光有数据没用。在Vue中数据需要绑定视图才能产生关系，这个视图其实挺好理解，就是DOM对象：

```html
<div id="divId">
        <div>
            数据1 = {{ data1 }}
        </div>
    	<div>
            数据2 = {{ data2 }}
        </div>
        <button v-on:click="method1">
            触发method1
        </button>
        <button v-on:click="method2">
            触发method2
        </button>
</div>
<script src="https://unpkg.com/vue@next"></script>
<script>
    const dataObj = {
                data() {
                    return {
                        data1: 1,
                        data2: 2
                    }
                },
                methods: {
                    method1() {
                        console.log("method1")
                    },
                    method2() {
                        console.log("method2")
                    }
                }
            };
    var demoApp = Vue.createApp(dataObj);
    demoApp.mount("#divId");
</script>
```

上面的操作将demoApp挂载到id=divId的DOM对象上，从而创建出ViewModel。基于这个ViewModel，Vue提供了页面数据变化的能力。

## 属性绑定

**本段参考Vue_01/01-DataBinding.html**

响应式数据放在Model的data()函数里返回，通过{{ }}在HTML文本内引用。实际上，在data()里面声明的属性最终会放在ViewModel的$data属性里：

```javascript

const BindingTestDataController = {
            data() {
                return {
                    sum: "0",
                    title: "this is customer title",
                    userData: {
                        username: null,
                        password: null
                    }
                }
            },
}
```

比如在BindingTestDataController这个Model中，定义了sum、title、userData三个属性，可以在HTML中通过{{}}引用：

```html
<div id="bindingTest">
    
    	<div v-bind:title="title">
            sum: {{ sum }}
        </div>
    
        <hr>
        <p>输入的内容： {{title}}</p>
        <input v-model="title" /><br>
        <p>用户名：<input v-model="userData.username" /></p>
        <p>密码：<input v-model="userData.password" /></p><br>
        <button v-on:click="submit">提交</button>
        <hr>
 </div>
```

标签的元数据可以通过v-bind:${元数据名}="${绑定属性名}"进行属性绑定。被标签限定的文本可以通过{{ 绑定的属性名 }}进行绑定，但这种方式默认输出文本，而不是html内容，除非使用v-html限定。

在{{ }}占位符中，甚至可以使用JS脚本，比如整型的{{ number + 1 }}、布尔的{{ ok ? "yes":"no" }}、字符的{{ str.split("#") }}，前提是数据已在组件的data内声明。

甚至可以绑定标签的元数据名，比如<a v-bind:[param] = "url">，当指定param = href时，这个标签就是`<a href="url">`

## 属性计算（计算属性）

**本段参考Vue01/02-AttributeCalculator.html**

有些时候，在{{ }}占位符里想通过方法来返回结果，可以通过Vue的属性计算实现。

将属性计算逻辑定义在Vue应用的computed属性里：

```js
const App = Vue.createApp({
            data() {
                return {
                    todos: ['A', 'B', 'C'],
                    firstName: '',
                    lastName: ''
                }
            },
            computed: {
                // 定义一个getDivContent的属性计算
                getDivContent() {
                    return this.todos
                },
                getFullName() {
                    result = this.firstName + this.lastName
                    console.log("result = " + result)
                    return result
                }
            }
        })
```

再通过{{ }}直接引用属性计算：

```html
<div id="divId">

        <div>
            <!-- 在{{ }}占位符里使用属性计算 -->
            {{ getDivContent }}
        </div>

        <div>
            <input v-model="firstName">
            <input v-model="lastName"><br>
            fullName: {{ getFullName }}
        </div>


    </div>
```

和方法的区别是：

1. 响应式数据发生变化的时候，属性计算会重新执行、显示最新值。
2. 方法在占位符使用时，需要指定参数。而computed是无参的。
3. 属性计算在响应式数据被没改变的情况下，多次调用会使用缓存，而方法却不行。

## 事件绑定

**本段参考Vue01/03-EventBinding.html**

事件绑定：通过v-on:click="${函数名}"的方式绑定事件。实际上，在methods里面声明的函数最终会定义在ViewModel里。

```html
<body>

    <div id="divId">
        <a>{{title}}</a>
        <button @click="methodA1(),methodA2()">按钮A</button>
    </div>

    <script src="https://unpkg.com/vue@next"></script>
    <script>

        const App = Vue.createApp({
            data() {
                return {
                    title: "自定义标题"
                }
            },
            methods: {
                methodA1(){
                    this.title = "更改后的标题"
                },
                methodA2(){
                    console.log(this.title)
                }
            }
        })
        App.mount('#divId')

    </script>

</body>
```

# 条件与循环

**本段参考Vue01/04-ConditionCircle.html**

通过v-if或者v-else标签，可以控制某些DOM是否显示。

通过v-for标签，可以循环展示Model内的属性、数组信息。

当然，v-for和v-if可以一起使用，但不能同级使用，因为v-if的优先级更高，可能无法识别条件属性：

```html
<div id="conditionCircle">
        <div v-if="show">出现</div>
        <div v-else>不出现</div>
        <button v-on:click="reverse">反转</button>
        <hr>
        <!-- 可以遍历数组 -->
        <!-- 在循环的时候，最好指定item的一个唯一属性作为key -->
        <div v-for="(item,index) in items" :key="item.id">
            <!-- 因为v-if的优先级比v-for高，所以不要将v-if放在v-for的标签里，否则v-if会认为item是undefined -->
            <li v-if="item.age != 20">
                下标：{{index}},姓名：{{item.name}},性别：{{item.age}}
            </li>
        </div>
        <!-- 也可以遍历一个对象的属性名、属性值 -->
        <div v-for="(value,key) in dataObj">
            属性值：{{key}} = {{value}}
        </div>
    </div>

    <script src="https://unpkg.com/vue@next"></script>
    <script>

        const conditionCircleController = {
            data() {
                return {
                    show: false,
                    items: [
                        { "id": 1, name: "A", age: "18" }, { "id": 2, name: "B", age: "19" }, { "id": 3, name: "C", age: "20" }
                    ],
                    dataObj: {
                        key1: "value1",
                        key2: "value2",
                        key3: "value3"
                    }
                }
            },
            methods: {
                reverse() {
                    this.show = !this.show
                }
            }
        }
        Vue.createApp(conditionCircleController).mount('#conditionCircle')
```



# 组件与子组件

**本段参考Vue01/05.ParentsSonConponent.html**

Vue提供了父组件与子组件的划分，可以理解为父Model与子Model的划分，分别创建两个Model：

```js
        const TodoItem = {
            // 允许从父组件（App）接收todo参数
            props: ['todo'],
            template: `<li>这里拿的是父组件传递过来的todo参数: {{todo}}---这里拿的是自己定义的myData参数：{{myData}}</li>`,
            data() {
                // 作为一个子组件，和父组件一样，可以自己定义属性自己使用
                return {
                    myData: '我自己的data'
                }
            }
        }

        const Parent = {
            data() {
                return {
                    todos: ['A', 'B', 'C']
                }
            },
            methods: {

            }
        }
```

此时两个Model相互独立，没有父子关系，但TodoItem定义了一个todo变量，这个变量定义在props里，而不是data，**目的是为了让父组件将值传进来**。接下来建立两个组件的父子关系：

```java
    const TodoItem = {
        // 允许从父组件（App）接收todo参数
        props: ['todo'],
        template: `<li>这里拿的是父组件传递过来的todo参数: {{todo}}---这里拿的是自己定义的myData参数：{{myData}}</li>`,
        data() {
            // 作为一个子组件，和父组件一样，可以自己定义属性自己使用
            return {
                myData: '我自己的data'
            }
        }
    }

    const Parent = {
        components: {
            // 定义一个名叫TodoItem的组件，引用上面声明的TodoItem组件
            TodoItem: TodoItem
        },
        data() {
            return {
                todos: ['A', 'B', 'C']
            }
        },
        methods: {

        }
    }
```

父组件定义了一个叫TodoItem的子组件，子组件的值是上面定义的TodoItem。父组件绑定视图，通过<todo-item>使用子组件（至于为什么是todo-item，因为HTML不区分大小写，定义了叫TodoItem的子组件，在HTML眼里是todoitem，具体使用通过横线分割）：

```html
<div id="divId">

        <div>
            <!-- 循环App内的todos属性获取item，将item赋值到TodoItem子组件的todo参数里，TodoItem通过todo参数赋值到{{todo}}模板里，渲染最终数据 -->
            <todo-item v-for="item in todos" v-bind:todo="item"></todo-item>
        </div>

    </div>

    <script src="https://unpkg.com/vue@next"></script>
    <script>


        // 定义一个组件component
        const TodoItem = {
            // 允许从父组件（App）接收todo参数
            props: ['todo'],
            template: `<li>这里拿的是父组件传递过来的todo参数: {{todo}}---这里拿的是自己定义的myData参数：{{myData}}</li>`,
            data(){
                // 作为一个子组件，和父组件一样，可以自己定义属性自己使用
                return {
                    myData: '我自己的data'
                }
            }
        }

        // 定义一个Vue应用（根组件）
        const App = Vue.createApp({
            components: {

                // 定义一个名叫TodoItem的组件，引用上面声明的TodoItem组件
                TodoItem: TodoItem

            },
            data() {
                return {
                    todos: ['A','B','C']
                }
            },
            methods: {

            }
        })

        // Vue应用绑定Document标签
        App.mount('#divId')

    </script>
```

在<todo-item>组件中，通过v-for来循环父组件的todos获取item，将item通过v-bind:todo标签赋值到子组件的todo属性里，最终通过子组件的template模板渲染数据。

# 总结

Vue的模板使用大致如上，还有其他细节的知识留到开发过程中翻阅官方文档查看：https://cn.vuejs.org/guide/essentials/template-syntax.html
