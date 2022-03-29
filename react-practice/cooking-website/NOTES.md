# Notes

## n1

这里需要在 data.map 前写 data，确信有 data，because our data is null by default until we fetch it
(Home.js)

## n2

这里注意和 Home.js 里面的 recipe Link 对照看，注意链接的写法
（RecipeList.js)

## n3

Link home 的 path 要添加 exact!!!否则当想要跳到单个 recipe page 的时候，还是会显示 home page
(App.js)

## n4 Context

right after useContext() is ThemeContext, not ThemeProvider
(NavBar.js)

## n5 context

when we use context outside the scope, it is undefined.
(useTheme.js)

## n6 context(...state)

return 后面不要直接写 mode，而不写...state，不然就会创建一个新的 mode，就创建了新的 state object, and there is no color property anymore
(ThemeContext.js)

## n7 dark mode css

这里小心不要写成.App .dark，不要多空一格
空格：parent 下面 children
不空格：同时拥有两个 class
(App.css)
