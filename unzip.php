<?php
// Secure Extractor for Hostinger to bypass encoding corruption
$zipFile = "app-update.zip";
$extractPath = __DIR__ . "/";

if (!file_exists($zipFile)) {
    die("<h2 style='color:red'>Error: $zipFile not found in the current directory.</h2>");
}

$zip = new ZipArchive;
$res = $zip->open($zipFile);
if ($res === TRUE) {
    $zip->extractTo($extractPath);
    $zip->close();
    echo "<div style='background: #020608; color: #fff; padding: 50px; text-align: center; font-family: sans-serif; height: 100vh;'>\n";
    echo "<img src='https://i.postimg.cc/W3MnzMzh/jjj.png' style='height: 80px; margin-bottom: 20px;'>\n";
    echo "<h1 style='color: #d4af37;'>ZHINOVAX PRESTIGE V1.1.0</h1>\n";
    echo "<p style='color: #008e9b; font-weight: bold;'>Update Successfully Deployed</p>\n";
    echo "<p>تمام فایل‌های نسخه جدید با موفقیت جایگزین شدند.</p>\n";
    echo "<a href='index.html?v=build_150' style='display: inline-block; background: #d4af37; color: #000; padding: 15px 40px; border-radius: 30px; text-decoration: none; font-weight: bold; margin-top: 30px;'>ورود به اپلیکیشن لوکس</a>\n";
    echo "</div>";
    echo "<p style='font-size: 14px;'><strong>Security Notice:</strong> For your site's safety, please log into Hostinger File Manager and delete both <b>unzip.php</b> and <b>app-update.zip</b>.</p>";
    echo "</div>";
} else {
    echo "<div style='font-family: Arial; padding: 20px; text-align: center; background: #ffebee; border: 2px solid #f44336; border-radius: 10px; max-width: 500px; margin: 40px auto;'>";
    echo "<h2 style='color:#c62828'>❌ EXTRACTION FAILED!</h2>";
    echo "<p>Error Code: $res</p>";
    echo "</div>";
}
?>
