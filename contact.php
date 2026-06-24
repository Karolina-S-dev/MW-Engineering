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

    $body = "
Nowe zgłoszenie ze strony:

Imię i nazwisko: $name
Firma: $company
Email: $email
Telefon: $phone
Stanowisko: $position

Wiadomość:
$message
";

    $headers = "From: biuro@mw-engineering.pl\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "Dziękujemy. Wiadomość została wysłana.";
    } else {
        echo "Wystąpił błąd podczas wysyłania wiadomości.";
    }
}
?>