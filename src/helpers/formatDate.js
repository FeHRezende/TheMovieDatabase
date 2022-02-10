const formatCommonDate = (date) => {
  let breakDate = date.slice(0, 10).split('-');
  return `${breakDate[2]}/${breakDate[1]}/${breakDate[0]}`;
};

const formatModernDate = (dates) => {

  const month = [];
  month['01'] = 'JAN';
  month['02'] = 'FEV';
  month['03'] = 'MAR';
  month['04'] = 'ABR';
  month['05'] = 'MAI';
  month['06'] = 'JUN';
  month['07'] = 'JUL';
  month['08'] = 'AGO';
  month['09'] = 'SET';
  month['10'] = 'OUT';
  month['11'] = 'NOV';
  month['12'] = 'DEZ';

  dates.map((data) => {
    let breakDate = data.release_date.split('-');
    data.release_date = `${breakDate[2]} ${month[breakDate[1]]} ${breakDate[0]}`;
  });

  return dates;

};

export { formatCommonDate, formatModernDate };
