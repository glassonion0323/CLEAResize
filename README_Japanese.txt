==============================================================================
            CLEAResize
            モアレを起こさず画像をリサイズするPhotoshopスクリプト
            https://github.com/glassonion0323/CLEAResize
==============================================================================

----------------------------------------
    動作環境
----------------------------------------
    Photoshop CS4以降 (Windows or Mac)

----------------------------------------
    ダウンロード
----------------------------------------
    最新リリースのページから「CLEAResize.zip」をダウンロードしてください。
    https://github.com/glassonion0323/CLEAResize/releases/latest

----------------------------------------
    インストール方法
----------------------------------------
1.  Photoshopが起動している場合はいったん終了し、CLEAResize.zip内の
    CLEAResize.jsxを以下のフォルダにコピーしてください。
    [Photoshopのインストール先ディレクトリ]/Presets/Scripts
    例えば、Windows・64bit版CS5の場合は以下のフォルダになります。
    C:\Program Files\Adobe\Adobe Photoshop CS5 (64 Bit)\Presets\Scripts
    コピー時に警告が出た場合は、「続行」を選択してください。
2.  Photoshopを起動すると、「ファイル」→「自動処理」メニュー内にCLEAResizeが
    追加されているはずです。
   （画像を開いていない時はCLEAResizeは選択できない状態になります。）

----------------------------------------
    使用法
----------------------------------------
    Photoshopでサイズ変更したい画像を開き、 「ファイル」→「自動処理」メニュー
    からCLEAResizeを選択してください。
    CLEAResizeのメイン画面が表示されます。
    サイズ変更後の幅、高さ、比率のいずれかを入力し、OKをクリックしてください。

  * 「暗く」オプション
    上記の使用例で示した通り、CLEAResizeは通常のバイキュービック法より元画像の
    色合いをよく保ったまま縮小することができます。
    しかし、逆にこの特徴によって、縮小結果が意図したより明るめになってしまうこ
    とがあります。例えば、印刷用の網点化画像は、印刷時にインクが広がる分（ドッ
    トゲイン）を考慮して各網点は意図的に小さめになっています。この画像を見たま
    まの色合いで縮小すると、印刷結果より白っぽい画像になってしまいます。
    「暗く (ドットゲインのシミュレート)」にチェックを入れてCLEAResizeを実行す
    ると、ドットゲインの簡易なシミュレーションを行い、印刷結果に近い暗めな結果
    を得ることができます。

----------------------------------------
    制限事項
----------------------------------------
  * CLEAResizeで縮小以前から存在するモアレを消すことはできません。
  * CLEAResizeは印刷用の網点データから画面表示用の画像を作るのには適しています
    が、別サイズの印刷用網点データを作る（A4用原稿をB5用に縮小するなど）には不
    向きです。
  * スマートオブジェクト上で発生するモアレはCLEAResizeでは防げません。スマート
    オブジェクト上でモアレが起きる場合、CLEAResizeを実行する前に該当レイヤーを
    ラスタライズしてください。

----------------------------------------
    変更履歴
----------------------------------------
  * Ver. 1.0.2 (Sep. 07, 2015)
    TEXT_VERSIONを修正
  * Ver. 1.0.1 (Sep. 07, 2015)
    CC0ライセンス適用
  * Ver. 1.0.0 (Sep. 06, 2015)
    リリース

----------------------------------------
    ライセンス
----------------------------------------
    CLEAResize.jsxはCC0 1.0 全世界 パブリック・ドメイン提供でライセンスされて
    います。
    日本語版CC0ライセンス要旨
    http://creativecommons.org/publicdomain/zero/1.0/deed.ja

    To the extent possible under law, the person who associated CC0 with
    CLEAResize has waived all copyright and related or neighboring rights to
    CLEAResize.
    You should have received a copy of the CC0 Public Domain Dedication along
    with this software. If not, see
    <http://creativecommons.org/publicdomain/zero/1.0/>.

----------------------------------------
    参考文献
----------------------------------------
    CLEAResizeは以下のページを参考に作成されました。

    「Gamma error in picture scaling」 Eric Brasseurさん (英語)
    http://www.4p8.com/eric.brasseur/gamma.html

    「Photoshop で【本当に】美しくリサイズする「ガンマ: 1.0 縮小法」 |
    亜細亜ノ蛾」 asiamothさん
    http://asiamoth.com/mt/archives/2011-02/19_2357.php

