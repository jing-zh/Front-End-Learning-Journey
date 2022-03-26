# 游戏思路
1. handlehoice保证有两个choice，并且选择第一项以后，就要选择第二项
2. comparechoice确保在两个choice的state被更新以后，才开始比较，使用useEffect
3. 在比较完成后，如果两个match，那就不用翻转回去，如果不match，就把卡片翻转回去(add the match property)
4. 添加flipped property，并做css animation
5. disable the card instantly after two choices are made and compared

# Notes

## n1 - useEffect
if compare cards right here, it might not work because these state updates are scheduled
code might fire first before even the state value is updated.
that's why we need to use useEffect hook

## n2 - useEffect
不要放在这个位置，因为这会直接在component load以后disable所有card
useEffect runs automatically when the component first evaluates, and when the disabled is true, we cannot flip the card.


# Questions

## q1 - map ...
这一步有一点模糊
怎么使用map和...

A：将原来的cards array改变，把其中match的card的matched property改变为true，并返回一个新的array