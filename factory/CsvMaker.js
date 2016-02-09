function convertToCSV(data) {
    if(!data){
      return null;
    }

    function escapeString (x) {
      if (x) {
        x = x.toString();
        return ('"' + x.replace(/"/g, '""').replace(',', ' ').replace('\n', ' ') + '"');
      } else {
        return ('" "');
      }
    }

    var columns=data[0];
    var headers = Object.keys(columns);
    var csv = '';

    headers.forEach(function(header) {
      csv += escapeString(header) + ',';
    });

    csv += '\n';

    debugger;

    data.forEach(function(row) {
      Object.keys(columns).forEach(function(obj) {
        debugger;
        console.log(obj.toString());
        console.log('rrrrrr'+row.toString());
        csv += escapeString(row[obj]) + ',';
      });
      csv += '\n';
    });
    return csv;
  }

  function createCsv(data){
    if(!data){
      return null;
    }
    var attachment = {
      contentType: 'text/csv'
    };
    attachment.filename = 'attachment' + Date.now() + '.csv';
    attachment.contents = new Buffer(convertToCSV(data, 'utf-8'));
    console.log(attachment);
    return attachment;
  }