function strGetRange1(start, row){
  let vadr = start;
  let k = 2;
  vadr += k.toString();
  vadr +=":";
  vadr+= start;
  vadr+=row.toString();
  return vadr;
}
/*
  Поиск неповторяющихся элементов
 */
function findinarr(f,arr){
  for(i=0; i!=arr.length; i++){
    let k = 0;
    for (ii = 0; ii != f.length; ii++){
      if (f[ii]==arr[i][0]) {
        ++k;
        break;
      }
    }
    if (k==0) f.push(arr[i][0]);
  }
  console.log("Found",f);
  return f;
}
/*
  count
 */
function countarr(f, arr){
  console.log(f.length, f[0]);
  console.log(arr.length, arr[0][0]);
  let k = [];
  
  for (i = 0; i!=f.length; i++){
    let count = 0;
    for (ii = 0 ; ii!=arr.length; ii++){
      if (f[i] == arr[ii][0])
        ++count;
    }
    k.push(count);
  }
  console.log(k);
  return k;
}

/*
 * For SMM client
 */
function SMM(){ /*67-181 */
  var rangestart = "O";
  var rangelimit = "O";
  var rangenumber = "BL1";
  var doc = FormApp.getActiveForm();
  var filename = "https://docs.google.com/spreadsheets/d/1NnrvjWeNCQaPtGUG-4UfpQft6z81YW4ws5Hsq4Pi6bg/edit#gid=333916551";

  // Set e-mail!!!
  var email = Session.getActiveUser().getEmail();

  var subject = "SMM";

  // Set doc`s URL
  var values = SpreadsheetApp.openByUrl(filename);
  texto = SpreadsheetApp.getCurrentCell();

  //Set count
  var cell = values.getActiveSheet().getRange(rangenumber);
  
  var integ = cell.getValue();
  if (integ > 4)
    integ=integ - 1;
  //subject+=integ.toString();

  var vadr = strGetRange1(rangestart, integ);
  //console.log(vadr);


  cell = values.getActiveSheet().getRange(vadr);
  texto = cell.getValues(); 
  //artexto(texto);
  // get D-columns (passport)
  let dcol = "D2:D" + integ.toString();
  let dcolr = values.getActiveSheet().getRange(dcol);
  let dcolrt = dcolr.getValues();
  //console.log(dcolrt);
  //console.log(texto, texto[0], texto[0][0]);
  for (i=0; i!=texto.length; i++){
    if (dcolrt[i]==0) texto[i][0] = '';
  }
  //
  let na=[];
  let phrase = findinarr(na,texto);
  
  /**delete "" */
  let sl = phrase.indexOf("");
  let rphrase = phrase.splice(sl, 1);
  console.log("rphrase:\t",rphrase,phrase);

  let counts = countarr(na, texto);
  let textout ="Отчёт с апреля 2021 г. об источниках получения сведений о клинике:\n";
  for (let i=0; i!= phrase.length; i++){
    textout+=phrase[i];
    textout+=":\t";
    textout+=counts[i];
    textout+="\n";
  }
  console.log(textout);

  //console.log("New file`s name:\t",subject);
  //var ankdoc = DocumentApp.create(subject);
  //console.log(ankdoc);
  //
  //  https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/concat
  //

  
  //console.log(stext);


  //var ID = ankdoc.getName();
  //var adbody = ankdoc.getBody();
  //adbody.setText(texto[0]);
  //adbody.setText(stext);
  
  //ankdoc.saveAndClose();

  //GmailApp.sendEmail(email, subject, stext);
  GmailApp.sendEmail(email, subject, textout);
  
  /* For Artdental Co */
  
  GmailApp.sendEmail("smm@artdental.company", subject, textout);
  
    /*Set the count cell */
  
}
