<?php

//=====関数作成=====//

//1.DBの接続====//
//引数：なし
//返り値：接続結果を返す
function dbConnect()
{

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
    } catch (PDOException $err) { //catchの引数にはPDOExceptionと$errを記述.$errはエラー内容が入ってくる
        echo '接続失敗' . $err->getMessage;
        //処理を終了させる
        exit();
    }

    return $dbh;
}


//2.データ取得====//
//引数：なし
//返り値：データ
function getAllBlog()
{
    $dbh = dbConnect();
    //データを取得するまでの3つの流れ
    //①SQL文の準備
    $sql = "SELECT * FROM blog";
    //②SQL文の実行:PDOstatementが返ってくるから無名で添字をつけた配列を返す
    $stmt = $dbh->query($sql);
    //③SQL文の結果取り出し:fetchAllは全ての行を返す。PDO::FETCH_ASSOC):
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo '接続成功';
    echo '<pre>';
    echo var_dump($result);
    echo '</pre>';
    //接続を終了させるために$dbhにnullを入れる
    $dbh = null;

    return $result;
}

//ブログデータ取得関数の実行
$blogData = getAllBlog();


//3.カテゴリー名を取得====//
//引数：数字
//返り値：categoryの文字列
function getCategory($num)
{
    if ($num === 1) {
        return 'ブログ';
    } elseif ($num === 2) {
        return '日常';
    } else {
        return 'その他';
    }
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
        <?php foreach ($blogData as $data) : ?>
            <tr>
                <td><?php echo $data["id"] ?></td>
                <td><?php echo $data["title"]  ?></td>
                <td><?php echo getCategory($data["category"]); ?></td>
            </tr>
        <?php endforeach; ?>
    </table>

</body>

</html>