# archive-data-visualizer
Vizualize your archive world!

## Installation
```
npm install -g archive-data-visualizer
```

## Usage
```
archive-data-visualizer <command> <command parameters>
```

## Commands
```
help        Display this help.
visualize   Performs data download from the k8s container, visualization and uploading the transformed result into the bookkit page.
```

## Parameters
### **--command** [string]
visualize, help commands. All these can be used as default commands without providing --command argument

### -c, --config [string]
File path to the configuration object.

**Configuration File Convention**

All configuration fields are mandatory.
```js
{
    "bookkit": {        
        "accessCode1": "... access code 1 ...",
        "accessCode2": "... access code 2 ...",
        "oidcHost": "... Oidc grantToken URI ...",
        "uri": "... BookKit base URI ..."
    },
    "visualizations": [
        {
            "id": "... visualization id ...",
            "pageCode": "... page code in the bookkit - must exist ...",
            "header": "... Page name ...",
            "description": "... Page description - uu5String supported ...",
            "basePath": "... base path for archive-data-downloader to know where to download data from ...",
            "statsFolder": "... folder within the base path where the statistics are stored ...",
            "tempFolder": "... local file system folder base path to know where the data should be extracted to the local system ...",
            "ranges": [
                {
                    "id": "... range id ...",
                    "sectionCode": "... section code to upload the generated uu5String visualization - must exist ...",
                    "header": "... section header ...",
                    "description": "... section description - uu5string supported ...",
                    "chartType": "... chart type (LineChart|BarChart|AreaChart|ComposedChart) - value is optional, LineChart is default...",
                    "aggregations": ["... array of aggregation types - (MIN|MAX|AVG|SUM|MEDIAN)..."],
                    "valueUnit": "... text value to be displayed on Y-axis ...",
                    "rangeType": "... range type value (week|month|all) ...",
                    "rangeSize": 1,
                    "monitorTrend": { // Calculate trend in data and visualize it in the chart. The tool will also caluclate the difference between the trends from the whole range interval and the interval defined in the monitoredTrend configuration  
                        "enabled": true,
                        "percentageDifference": 10,
                        "rangeType": "... range type value (week|month|all) ...",
                        "rangeSize": 1
                    }
                }
            ],
            "attributes": [
                // first attribute with type=label, valueKey=label is mandatory
                {
                    "type": "label",
                    "valueKey": "label"
                },
                {
                    "type": "... attribute type (label|value) ...",
                    "valueKey": "... csv column name (Y axis) ...",
                    "name": "... display name ...",
                    "colorSchema": "red-rich",
                    "chartType": "... applicable in case ComposedChart is used for the range as a chart type (area|line|bar) ...",
                    "monitorTrend": { // definition of monitored trend line
                        "enabled": true,
                        "valueKey": "... attribute name ...",
                        "name": "... diplay name ...",
                        "colorSchema": "red",
                        "chartType": "... applicable in case ComposedChart is used for the range as a chart type (area|line|bar) ...",
                    }
                }
            ]
        }
    ]
}
```

In case the configuration is not provided, the tool searches for the configuration file in a default location ```%HOME%/.archive-data-visualizer/config.json```

### --archive-data-downloader-config
File path to the configuration object of the ```archive-data-downloader``` tool. 
It is optional, in that case the ```archive-data-downloader``` will scan for the configuration file in its default location. 
See more in [archive-data-downloader](https://github.com/xaverric/archive-data-downloader) documentation.

### --visualizationFilter string[]
Define what visualization should be performed from the configuration object. If not defined, the tool will perform all visualizations. Each visualization is identified by its "id" value.

### --rangeFilter string[]
Define what range should be performed for each visualization from the configuration object. If not defined, the tool will perform visualization for all defined ranges. Each range is identified by its "id" value.

## Logs
logs are automatically stored to the ```%HOME%/.archive-data-visualizer/logs``` folder