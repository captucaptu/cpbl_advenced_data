var allPlayers = [];
let urlParams = new URLSearchParams(window.location.search);
let grade = urlParams.get('grade');
if(grade == '1' || !grade || urlParams.get('stat') == 'pbat'){
  let tbHead = $('.std_tb.mix_x thead tr');
  let tbBody = $('.std_tb.mix_x tbody tr');
  if(tbHead.length <= 0){
    tbHead = $('.std_tb.mix_x tr').eq(0);
    tbBody = $('.std_tb.mix_x tbody tr').not(tbHead);
  }
  

  tbHead.append('<th title="wOBA" data-sort="float" data-sort-default="desc" align="center" style="display:table-cell;" class="display_a1"><a href="#">wOBA</a></th>');
  tbBody.each(function(key,item){
    var tempPlayer = {};
    $(this).find('td').each(function(i){
      tempPlayer[tbHead.find('th').eq(i).text()] = Number($(this).text());
    });
    
    var wOBA = calcwOBA(tempPlayer['BB'], tempPlayer['HBP'], tempPlayer['1B'], tempPlayer['2B'], tempPlayer['3B'], tempPlayer['HR'], tempPlayer['AB'], tempPlayer['BB'], tempPlayer['IBB'], tempPlayer['SF'], tempPlayer['HBP'])
    tempPlayer['wOBA'] = wOBA;
    allPlayers[key] = tempPlayer;
    //var wobaCell = $(`<td>${wOBA}</td>`);
    $(this).append($(`<td align="center">${wOBA}</td>`));
  });




}

$.ajax({
  url: 'http://www.cpbl.com.tw/stats/all.html?year=2021&game_type=01&stat=pbat&online=0&sort=G&order=desc&per_page=2',
  method: 'get',
  dataType: 'html',
  success:function(res){
    var test = $(res).find('.std_tb.mix_x');
    $('.std_tb.mix_x').after(test);
    //console.log(test)
  },
  error:function(err){console.log(err)},
});

// wOBA = (0.691×uBB + 0.722×HBP + 0.884×1B + 1.257×2B + 1.593×3B + 2.058×HR) / (AB + BB – IBB + SF + HBP)

function calcwOBA (uBB, HBP, B1, B2, B3, HR, AB, BB, IBB, SF, HBP){
  //console.log((0.691*uBB + 0.722*HBP + 0.884*B1 + 1.257*B2 + 1.593*B3 + 2.058*HR) + "  " +  (AB + BB - IBB + SF + HBP))
  var orign = (0.691*uBB + 0.722*HBP + 0.884*B1 + 1.257*B2 + 1.593*B3 + 2.058*HR) / (AB + BB - IBB + SF + HBP);
  return Math.round(orign * 1000) / 1000;
}

//$('table.std_tb.mix_x').find('tr').prepend('<th>test</th>')


