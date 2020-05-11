import config from './config'
/**
 * Load the cars from the spreadsheet
 * Get the right values from it and assign.
 */
export function load(callback) {

  window.gapi.client.load("sheets", "v4", () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.spreadsheetId,
        range: "Form Responses 1!B2:N"
      })
      .then(
        response => {
          const data = response.result.values;
          console.log(data);
          const submissions = data.map(submission => ({
            category: submission[0],
            tower: submission[1],
            name: submission[2],
             gender: submission[3],
              age: submission[4],
              phone: submission[5],
               profile: submission[6],
               submission:submission[7],
               submission_link:submission[8],
               for_competition:submission[9],
               type:submission[10],
               update_url:submission[12]

          })) || [];
          callback({
            submissions
          });
        },
        response => {
          callback(false, response.result.error);
        }
      );
  });
}