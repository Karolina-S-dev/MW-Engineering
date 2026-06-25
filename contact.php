<?php

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $name = htmlspecialchars($_POST["name"] ?? "");
    $company = htmlspecialchars($_POST["company"] ?? "");
    $email = htmlspecialchars($_POST["email"] ?? "");
    $phone = htmlspecialchars($_POST["phone"] ?? "");
    $position = htmlspecialchars($_POST["position"] ?? "");
    $message = htmlspecialchars($_POST["message"] ?? "");

    $to = "biuro@mw-engineering.pl";
    $subject = "Nowe zapytanie ze strony MW-Engineering";

    $boundary = md5(time());

    $headers = "From: biuro@mw-engineering.pl\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

    $body = "--$boundary\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";

    $body .= "Nowe zgłoszenie ze strony:\n\n";
    $body .= "Imię i nazwisko: $name\n";
    $body .= "Firma: $company\n";
    $body .= "Email: $email\n";
    $body .= "Telefon: $phone\n";
    $body .= "Stanowisko: $position\n\n";
    $body .= "Wiadomość:\n$message\n\n";

    // Załącznik
    if (
        isset($_FILES["file"]) &&
        $_FILES["file"]["error"] === UPLOAD_ERR_OK
    ) {

        // Maksymalny rozmiar: 10 MB
        if ($_FILES["file"]["size"] > 10 * 1024 * 1024) {
            header("Location: contact.html?status=error");
            exit;
        }

        // Dozwolone rozszerzenia
        $allowed = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'];

        $extension = strtolower(pathinfo($_FILES["file"]["name"], PATHINFO_EXTENSION));

        if (!in_array($extension, $allowed)) {
            header("Location: contact.html?status=error");
            exit;
        }

        $fileTmp = $_FILES["file"]["tmp_name"];
        $fileName = basename($_FILES["file"]["name"]);
        $fileType = mime_content_type($fileTmp);
        $fileData = chunk_split(base64_encode(file_get_contents($fileTmp)));

        $body .= "--$boundary\r\n";
        $body .= "Content-Type: $fileType; name=\"$fileName\"\r\n";
        $body .= "Content-Disposition: attachment; filename=\"$fileName\"\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
        $body .= $fileData . "\r\n";
    }

    $body .= "--$boundary--";

    if (mail($to, $subject, $body, $headers)) {
        header("Location: contact.html?status=success");
        exit;
    } else {
        header("Location: contact.html?status=error");
        exit;
    }
}
?>