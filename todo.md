# テスト駆動開発の勉強用

TDD 飲み会で実施した内容があまり納得いかなかったので改めて実践してみる

## TODO

カウンターストリング ... 何文字で切り捨てられたのかを即座に知ることができる任意の長さを持つ目盛り付きの文字列

- [x] 長さ5のカウンターストリングの結果として35\*が返る
- [x] 長さ10のカウンターストリングの結果として35710\*が返る
- [*] 長さ35のカウンターストリングの結果として2468111417202326293235\*が返る
- [ ] 与えられた長さからマイナス2ずつしていくことでカウンターストリングの結果を返すことができる（仮説）
  - [ ] 長さ5を与えると35を返す

お題 counterstring
ジェームズ・バッハ（James Bach）は、カウンターストリング（counterstring）を次のように説明しています。

「カウンターストリングとは、任意の長さを持つ目盛り付きの文字列のことだ。文字列のどの位置にいても、その文字が何番目なのかが常にわかるようになっている。これは、巨大な文字列をフィールドに貼り付けた際に、ある地点で切り捨てられてしまった場合などに便利だ。何文字で切り捨てられたのかを即座に知ることができるからだ」

この文字列は必ずアスタリスク（\*）で終わり、文字列内の数値は、その直後に続くアスタリスクの文字位置を表します。

長さ 5: 35\*

長さ 10: 35710\*

長さ 35: 2468111417202326293235\*

あなたの課題は、非負の整数を受け取り、その長さのカウンターストリングを生成するプログラムを作成することです。

original text
James Bach, describes counter strings as follows:

"A counterstring is a graduated string of arbitrary length. No matter where you are in the string, you always know the character position. This comes in handy when you are pasting huge strings into fields and they get truncated at a certain point. You want to know how many characters that is."

The string always ends in an asterisk and any number in a string denotes the position of the succeeding asterisk.

Length 5: 35* Length 10: 35710* Length 35: 2468111417202326293235\*

Your task is to write a program that takes a non-negative integer number and creates a counterstring of that length.
