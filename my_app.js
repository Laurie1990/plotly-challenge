// bubble chart

//horizontal bar graph
function bargraph(id_iput) {
        //read the data
        d3.json("samples.json").then((data_json) => {
                //get the data of ids, sample values hover text ->labels
                var samplesdata = data_json.samples;
                // filter the data to only get the information associated with the input id
                var id_data = samplesdata.filter(x => x.id == id_iput);
        //since it is an array get the first array of otu_ids
        var otu_ids = id_data[0].otu_ids;
        var otu_labels = id_data[0].otu_labels;
        var otu_values = id_data[0].sample_values;
        //format your id to add OTU in the beginning
        var yValues = otu_ids.slice(0, 10).map(x => "OTU" + x).reverse()
        //this where you select your x axis value, y axis value and type of graph
        var readData = {
                x: otu_values.slice(0, 10).reverse(),     //top 10 values
                y: yValues,     // formatted ids
                text: otu_labels.slice(0, 10).reverse(),     //labels
                type: "bar", //bar graphs
                orientation: "h" //horizontal graphs
        };
        var setLayout = {
                title: "Bacteria found"
        };
        var data = [readData];
        Plotly.newPlot("bar", data, setLayout);
    });
};

// //Meta Data
// function Metadata(id_iput) {
//     d3.json("samples.json").then((data_json) => {
//         //get the data of ids, sample values hover text ->labels
//         var samplesdata = data_json.samples;
//          // filter the data to only get the information associated with the input id
//         var id_data = samplesdata.filter(x => x.id == id_iput);

//       var panel = d3.select('#sample-metadata')
//       panel.html(' ')
//       Object.entries(data_json).forEach(([key,value])=>{
//        panel.append('h4').text(`${key}: ${value}`)  //h4 is appended as panel title is in h3
//       })
//       console.log()
//    //buildGauge(data.WFREQ);
//   })
//   };


function buildMetadata(smetadata) {
    //let url = "/metadata/" + sample;
    d3.json("samples.json").then(samples_metadata => {
      smetadata = d3.select("#sample-metadata");
      smetadata.html('');
      Object.entries(samples_metadata).forEach(([key, value]) => {
        smetadata.append('div').html(`${key}: ${value}<br>`);
      });
  
      // The following code will do the same thing
      // let samples_metadata_str = ``;
      // Object.entries(samples_metadata).forEach(([key, value]) => {
      //   samples_metadata_str = samples_metadata_str + `${key}: ${value}<br><br>`
      // });
      // d3.select("#sample-metadata").html(() => samples_metadata_str);
  
      // let wfreq = samples_metadata.WFREQ;
      // console.log(`dkwon@todo: ${wfreq} buildgauge`);
      // @TODO
      buildGauge(samples_metadata.WFREQ);
    });
  }



// demographic info

//drop down menu
function defaultfunction() {
    //this populates the dropdown for users to choose
    d3.json("samples.json").then((data) => {
            var names = data.names;
            names.forEach((name) => {
                    d3.select("#selDataset").append("option").text(name).property("value", name);
            });
        //select one by default
        bargraph(data.names[0]);
        //place your bubule chart and demographics function here
    });
};

//when user changes it then it will change the graphs
// get optionChanged(this.value) from the index file and create a function for it
// this function should change the visualisations based on the selected id
function optionChanged(userInput) {    
    bargraph(userInput);    
    //place your bubule chart and demographics function here
    buildMetadata(smetadata)
};
//this is the default function you initialise that chooses a default option of the dropdown menu so graphs will always be shown
defaultfunction();
