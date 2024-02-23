<?php

$dsn = 'mysql:host=localhost;dbname=blog_app;charset=utf8';
$user = 'onuma';
$pass = 'P19If40TddW7V*Vb';


//DB接続の際は必ずエラーチェック構文を使用する（try,catch）
try {
    //DB接続用のクラスをインスタンス化：引数にDB情報、user名,パスワードが必要。第四引数でオプションも設定可能（配列）
    //mysqlにてユーザー登録を行う際、使用するDBのアクセス権限を付与しておかないと接続できない。※mysqlの権限→データベース→該当のDBをプルダウンで選択→データベースに権限を追加
    $dsh = new PDO($dsn, $user, $pass, [
        //PDOの静的連想配列で設定。エラーモードを例外出力する設定
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    echo '接続成功';
    //接続を終了させるために$dbhにnullを入れる
    $dbh = null;
} catch (PDOException $err) { //catchの引数にはPDOExceptionと$errを記述.$errはエラー内容が入ってくる
    echo '接続失敗' . $e->getMessage;
    //処理を終了させる
    exit();
}
