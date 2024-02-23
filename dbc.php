<?php

$dsn = 'mysql:host=localhost;dbname=blog_app;charset=utf8';
$user = 'onuma';
$pass = 'P19If40TddW7V*Vb';


//DB接続の際は必ずエラーチェック構文を使用する（try,catch）
try {
    //DB接続用のクラスをインスタンス化：引数にDB情報、user名,パスワードが必要。第四引数でオプションも設定可能（配列）
    //mysqlにてユーザー登録を行う際、使用するDBのアクセス権限を付与しておかないと接続できない。※mysqlの権限→データベース→該当のDBをプルダウンで選択→データベースに権限を追加
    $dbh = new PDO($dsn, $user, $pass, [
        //PDOの静的連想配列で設定。エラーモードを例外出力する設定
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    echo '接続成功';

    //データを取得するまでの3つの流れ
    //①SQL文の準備
    $sql = "SELECT * FROM blog";
    //②SQL文の実行:PDOstatementが返ってくるから無名で添字をつけた配列を返す
    $stmt = $dbh->query($sql);
    //③SQL文の結果取り出し:fetchAllは全ての行を返す。PDO::FETCH_ASSOC):
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo '<pre>';
    echo var_dump($result);
    echo '</pre>';
    //接続を終了させるために$dbhにnullを入れる
    $dbh = null;
} catch (PDOException $err) { //catchの引数にはPDOExceptionと$errを記述.$errはエラー内容が入ってくる
    echo '接続失敗' . $e->getMessage;
    //処理を終了させる
    exit();
}


?>


<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP DB practice</title>
</head>

<body>
    <h2>ブログ一覧</h2>
    <table>
        <tr>
            <th>No</th>
            <th>タイトル</th>
            <th>カテゴリ</th>
        </tr>
        <?php foreach ($result as $column) : ?>
            <tr>
                <td><?php echo $column["id"] ?></td>
                <td><?php echo $column["title"]  ?></td>
                <td><?php echo $column["category"] ?></td>
            </tr>
        <?php endforeach; ?>
    </table>

</body>

</html>