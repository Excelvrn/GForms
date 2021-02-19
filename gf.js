function myff() {
  var doc = FormApp.getActiveForm();

  // Access the body of the document, then add a paragraph.
  //doc.getBody().appendParagraph('This document was created by Google Apps Script.');

  // Get the URL of the document.
  //var url = doc.getUrl();

  // Set e-mail!!!
  var email = Session.getActiveUser().getEmail();

  // Get the name of the document to use as an email subject line.
  //var subject = doc.getName();
  var subject = "Pacient`s datas";
  //var subject = doc.getId();
  //var texto = "Hello! From GMail";

  // Set doc`s URL
  //var values = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1qRva0o3D0x4yYYk-KcB5GnT4-fL0t4VLlau8yGzbesU/edit#gid=1640624130");
  // https://docs.google.com/spreadsheets/d/1NnrvjWeNCQaPtGUG-4UfpQft6z81YW4ws5Hsq4Pi6bg/edit?usp=sharing
  var values = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1NnrvjWeNCQaPtGUG-4UfpQft6z81YW4ws5Hsq4Pi6bg/edit?usp=sharing");
  //texto = values.getActiveSheet().getActiveRange();
  texto = SpreadsheetApp.getCurrentCell();
  //Set count
  var cell = values.getActiveSheet().getRange("W1");
  
  var integ = cell.getValue();
  integ = integ + 1;
  cell.setValue(integ);
  var vadr = "B";
  vadr += integ.toString();
  vadr +=":";
  vadr+= "U";
  vadr+=integ.toString();

  cell = values.getActiveSheet().getRange(vadr);

  //cell = values.getActiveSheet().getRange(inte);
  //var cell = values.getActiveSheet().getRange("A2:D2");
  //texto = cell.getValues();
  texto = cell.getValues();
  //texto = vadr;
  //texto = vadr;
  // Send yourself an email with a link to the document.
  GmailApp.sendEmail(email, subject, texto);
  GmailApp.sendEmail("nmorozov@artdental.company", subject, texto);

  var ankdoc = DocumentApp.create(texto[0][0]);
  var adbody = ankdoc.getBody();
  adbody.setText(texto[0][3]);
}
