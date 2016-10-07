
<?php 
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    try {
        $artist = urlencode($_GET['artist']);
        $search_url = 'https://api.spotify.com/v1/search?q=' . $artist . '&type=artist&limit=10';
        $data = file_get_contents($search_url);
        if ($data === false) {
            header('HTTP/1.1 400 Bad Request.');
        } else {
            echo $data;
        }
    } catch (Exception $err) {
        header('HTTP/1.1 500 Internal Server Error. ' . $err);
    }
} else {
    header('HTTP/1.1 405 Method Not Allowed.');
}