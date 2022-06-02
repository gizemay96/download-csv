import React from "react";


const downloadCSV = async (name) => {
  const url = 'localhost:5001/api/v0/reconciliation/export?CheckoutStartDate=2002-05-05&CheckoutEndDate=2022-05-25'
  const response = await fetch(url);
  const data = await response.text();
  const blob = new Blob([data], { type: "data:text/csv;charset=utf-8," });
  const blobURL = window.URL.createObjectURL(blob);

  // Create new tag for download file
  const anchor = document.createElement("a");
  anchor.download = name;
  anchor.href = blobURL;
  anchor.dataset.downloadurl = ["text/csv", anchor.download, anchor.href].join(
    ":"
  );
  anchor.click();

  // Remove URL.createObjectURL. The browser should not save the reference to the file.
  setTimeout(() => {
    // For Firefox it is necessary to delay revoking the ObjectURL
    URL.revokeObjectURL(blobURL);
  }, 100);
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Finished: []
    };
  }


  render() {
    const styles = {
      button: {
        border: "none",
        borderRadius: 5,
        color: "green",
        border: "1px solid orange",
        padding: "1em",
        cursor: "pointer",
        background: "white",
        margin: "1em"
      }
    };
    return (
      <div className="App">
        <h1 className="test">Download CSV</h1>
        <button
          onClick={() => downloadCSV("name.csv")}
          style={styles.button}
        >
          Download Csv
        </button>
      </div>
    );
  }
}


// function App() {

//   useEffect(() => {
//   }, []);

//   const downloadFile = () => {
//     // const RequestUrl = 'localhost:5001/api/v0/reconciliation/export?CheckoutStartDate=2002-05-05&CheckoutEndDate=2022-05-25'
//     const RequestUrl = 'https://retoolapi.dev/4x8APf/data'
    
//     axios.get(RequestUrl)
//       .then(response => {
//         const url = window.URL.createObjectURL(new Blob([response.data]))
//         const link = document.createElement('a')
//         link.href = url
//         link.setAttribute('download', 'file.csv');
//         document.body.appendChild(link)
//         link.click()
//       })

//   }

//   const handleDownload = () => {

//      const RequestUrl = 'localhost:5001/api/v0/reconciliation/export?CheckoutStartDate=2002-05-05&CheckoutEndDate=2022-05-25'

//     const link = document.createElement("a");
//     link.target = "_blank";
//     link.download = "YOUR_FILE_NAME"
//     axios
//       .get(RequestUrl, {
//         responseType: "blob",
//       })
//       .then((res) => {
//         link.href = URL.createObjectURL(
//           new Blob([res.data], { type: "video/mp4" })
//         );
//         link.click();
//       });
//   };

//   return (
//     <div>
//       <h1>Hello StackBlitz!</h1>
//       <p>Start editing to see some magic happen</p>
//       {(
//         <a onClick={downloadFile}>
//           download
//         </a>
//       )}
//     </div>
//   );
// }

export default App;
