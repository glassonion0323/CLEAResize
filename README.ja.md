# CLEAResize
モアレを起こさず画像をリサイズするPhotoshopスクリプト

[English](https://github.com/glassonion0323/CLEAResize/blob/master/README.md)

## 使用例

### クロード・メラン 「聖ヴェロニカの聖骸布」 (1649)
オリジナルの20%に縮小  
<img alt="聖ヴェロニカの聖骸布" src="https://raw.githubusercontent.com/wiki/glassonion0323/CLEAResize/images/mellanface400compare.jpg" />

### 同心円
オリジナル 600x600  
<img alt="オリジナル 600x600" src="https://raw.githubusercontent.com/wiki/glassonion0323/CLEAResize/images/concentric.png" />  

縮小 200x200 (バイキュービック)  
<img alt="縮小 200x200 (バイキュービック)" src="https://raw.githubusercontent.com/wiki/glassonion0323/CLEAResize/images/concentric_200_bicubic.png" />  

縮小 200x200 (CLEAResize)  
<img alt="縮小 200x200 (CLEAResize)" src="https://raw.githubusercontent.com/wiki/glassonion0323/CLEAResize/images/concentric_200_clearesize.png" />  

### チェッカーと灰色の変遷
オリジナル 512x512  
<img alt="オリジナル 512x512" src="https://raw.githubusercontent.com/wiki/glassonion0323/CLEAResize/images/graychecker.png" />  

縮小 290x290 (バイキュービック)  
<img alt="縮小 290x290 (バイキュービック)" src="https://raw.githubusercontent.com/wiki/glassonion0323/CLEAResize/images/graychecker_290_moire.png" />  

縮小 290x290 (CLEAResize)  
<img alt="縮小 290x290 (CLEAResize)" src="https://raw.githubusercontent.com/wiki/glassonion0323/CLEAResize/images/graychecker_290_clearesize.png" />  

縮小 145x145 (バイキュービック)  
<img alt="縮小 145x145 (バイキュービック)" src="https://raw.githubusercontent.com/wiki/glassonion0323/CLEAResize/images/graychecker_145_bicubic.png" />  

縮小 145x145 (CLEAResize)  
<img alt="縮小 145x145 (CLEAResize)" src="https://raw.githubusercontent.com/wiki/glassonion0323/CLEAResize/images/graychecker_145_clearesize.png" />  

## 動作環境
Photoshop CS4以降 (Windows or Mac)

## ダウンロード
[最新リリースのページ](https://github.com/glassonion0323/CLEAResize/releases/latest)から*CLEAResize.zip*をダウンロードしてください。

## インストール方法
1. Photoshopが起動している場合はいったん終了し、CLEAResize.zip内のCLEAResize.jsxを以下のフォルダにコピーしてください。  
*[Photoshopのインストール先ディレクトリ]/Presets/Scripts*  
例えば、Windows・64bit版CS5の場合は以下のフォルダになります。  
C:\\Program Files\\Adobe\\Adobe Photoshop CS5 (64 Bit)\\Presets\\Scripts  
コピー時に警告が出た場合は、「続行」を選択してください。  
2. Photoshopを起動すると、「ファイル」→「自動処理」メニュー内にCLEAResizeが追加されているはずです。  
<img alt="Photoshopのメニュー" src="https://raw.githubusercontent.com/wiki/glassonion0323/CLEAResize/images/clearesizemenu_ja.png" />  
（画像を開いていない時はCLEAResizeは選択できない状態になります。）

## 使用法
Photoshopでサイズ変更したい画像を開き、 「ファイル」→「自動処理」メニューからCLEAResizeを選択してください。  
<img alt="メイン画面" src="https://raw.githubusercontent.com/wiki/glassonion0323/CLEAResize/images/clearesizedialog_ja.png" />  
上図の画面が表示されます。  
サイズ変更後の幅、高さ、比率のいずれかを入力し、OKをクリックしてください。

### 「暗く」オプション
上記の使用例で示した通り、CLEAResizeは通常のバイキュービック法より元画像の色合いをよく保ったまま縮小することができます。  
しかし、逆にこの特徴によって、縮小結果が意図したより明るめになってしまうことがあります。例えば、印刷用の網点化画像は、印刷時にインクが広がる分（ドットゲイン）を考慮して各網点は意図的に小さめになっています。この画像を見たままの色合いで縮小すると、印刷結果より白っぽい画像になってしまいます。  
「暗く (ドットゲインのシミュレート)」にチェックを入れてCLEAResizeを実行すると、ドットゲインの簡易なシミュレーションを行い、印刷結果に近い暗めな結果を得ることができます。  
<img alt="「暗く」オプション" src="https://raw.githubusercontent.com/wiki/glassonion0323/CLEAResize/images/dvorak_comparison_ja.png" />

## 制限事項
* CLEAResizeで縮小以前から存在するモアレを消すことはできません。  
* CLEAResizeは印刷用の網点データから画面表示用の画像を作るのには適していますが、別サイズの印刷用網点データを作る（A4用原稿をB5用に縮小するなど）には不向きです。  
* スマートオブジェクト上で発生するモアレはCLEAResizeでは防げません。スマートオブジェクト上でモアレが起きる場合、CLEAResizeを実行する前に該当レイヤーをラスタライズしてください。

## 変更履歴
* Ver. 1.0.3 (Mar. 19, 2016)  
縮小前にぼかしを追加。  
このぼかしは非常に弱いため、大抵のケースでは違いがわからないが、効果的にモアレを防止できる。
* Ver. 1.0.2 (Sep. 07, 2015)  
TEXT_VERSIONを修正
* Ver. 1.0.1 (Sep. 07, 2015)  
CC0ライセンス適用
* Ver. 1.0.0 (Sep. 06, 2015)  
リリース

## ライセンス
CLEAResize.jsxはCC0 1.0 全世界 パブリック・ドメイン提供でライセンスされています。  
日本語版CC0ライセンス要旨  
http://creativecommons.org/publicdomain/zero/1.0/deed.ja

To the extent possible under law, the person who associated CC0 with CLEAResize has waived all copyright and related or neighboring rights to CLEAResize.  
You should have received a copy of the CC0 Public Domain Dedication along with this software. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.

## 参考文献
CLEAResizeは以下のページを参考に作成されました。
* [Gamma error in picture scaling](http://www.4p8.com/eric.brasseur/gamma.html) Eric Brasseurさん (英語)
* [Photoshop で【本当に】美しくリサイズする「ガンマ: 1.0 縮小法」 | 亜細亜ノ蛾](http://asiamoth.com/mt/archives/2011-02/19_2357.php) asiamothさん
