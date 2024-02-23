<?php

$dsn = 'mysql:host=localhost;dbname=blog_app;charset=utf8';
$user = 'onuma';
$pass = 'P19If40TddW7V*Vb';

//DB接続用のクラスをインスタンス化：引数にDB情報、user名,パスワードが必要。第四引数でオプションも設定可能
//mysqlにてユーザー登録を行う際、使用するDBのアクセス権限を付与しておかないと接続できない。※mysqlの権限→データベース→該当のDBをプルダウンで選択→データベースに権限を追加
$dsh = new PDO($dsn, $user, $pass);
