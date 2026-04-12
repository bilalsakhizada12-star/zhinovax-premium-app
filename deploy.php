<?php
/**
 * Zhinovax Deployment Bridge
 * Moves files from staging (public_html/app) to live (domains/zhinovax.com/public_html/app)
 */

$staging = $_SERVER['DOCUMENT_ROOT'] . '/app';
$live = $_SERVER['DOCUMENT_ROOT'] . '/../domains/zhinovax.com/public_html/app';

// If running from the subfolder itself, adjust paths
if (strpos(__DIR__, 'public_html/app') !== false) {
    $staging = __DIR__ . '/..';
    $live = __DIR__ . '/../../../domains/zhinovax.com/public_html/app';
}

function full_copy($source, $target) {
    if (!is_dir($source)) return false;
    if (!is_dir($target)) mkdir($target, 0755, true);
    
    $d = dir($source);
    while (false !== ($entry = $d->read())) {
        if ($entry == '.' || $entry == '..') continue;
        $srcFile = $source . '/' . $entry;
        $tgtFile = $target . '/' . $entry;
        
        if (is_dir($srcFile)) {
            full_copy($srcFile, $tgtFile);
        } else {
            copy($srcFile, $tgtFile);
        }
    }
    $d->close();
    return true;
}

echo "<h1>Zhinovax Deploy Bridge</h1>";

if (!isset($_GET['key']) || $_GET['key'] !== 'zhinovax_secret_99') {
    die("<h2 style='color:orange'>Access Denied: Missing or invalid key.</h2>");
}

echo "Attempting to sync files...<br>";

// We assume staging is ALWAYS public_html/app (relative to our home)
// Based on our probe, the home dir has public_html and domains folders.
$home = dirname($_SERVER['DOCUMENT_ROOT'], 1); // Go up from public_html
$staging = $home . '/public_html/app';
$live = $home . '/domains/zhinovax.com/public_html/app';

echo "Source: $staging<br>";
echo "Target: $live<br>";

if (full_copy($staging, $live)) {
    echo "<h2 style='color:green'>SUCCESS! Live site updated.</h2>";
    echo "Time: " . date('Y-m-d H:i:s');
} else {
    echo "<h2 style='color:red'>FAILED! Source directory not found.</h2>";
}
?>
