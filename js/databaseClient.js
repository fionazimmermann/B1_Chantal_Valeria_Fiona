/* 
- Erlaubt die Kommunikation mit einer Datenbank via SQL und JavaScript zu Schulungszwecken.
- Muss auf der Web Page eingebunden werden, wo das Formular ist. 
- Sie müssen nicht im Detail verstehen, wie der Code funktioniert. 
*/

const SERVER_URL = "https://ict-290.herokuapp.com/sql";
const databaseClient = {
  executeSqlQuery: async (data) => {
    try {
      const response = await fetch(SERVER_URL, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.error) {
        console.error(result.error);
      }
      return result;
    } catch (error) {
      console.error("error", error);
    }
  },

  insertInto: async (formData) => {
    let result = null;
    const fields = Object.keys(formData.columns);
    const values = Object.values(formData.columns);

    const sql = `INSERT INTO ${formData.tableName} (${fields.join(
      ","
    )}) VALUES ('${values.join("','")}')`;
    try {
      result = await databaseClient.executeSqlQuery({
        sql: sql,
        pw: formData.pw,
        group: formData.group,
      });
    } catch (error) {
      console.error("Fehler bei der Datenbank: ", error);
    }
    return result;
  },

  selectData: async (formData) => {
    let result = null;
    // const fields = Object.keys(formData.columns);
    // const values = Object.values(formData.columns);

    let selectedCols = "";

    for (let i = 0; i < formData.columns.length; i++) {
      selectedCols += formData.columns[i];
      if (i < formData.columns.length - 1) selectedCols += ", "
    }

    const sql = `SELECT ${selectedCols} FROM ${formData.tableName} WHERE ${formData.filter}`;

    try {
      result = await databaseClient.executeSqlQuery({
        sql: sql,
        pw: formData.pw,
        group: formData.group,
      });
    } catch (error) {
      console.error("Fehler bei der Datenbank: ", error);
    }
    return result;
  } 
};
