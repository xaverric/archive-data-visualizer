const { escapeUu5StringArray } = require("../../../helper/uu5string-escape-helper");

const template = (range, chartSeries, chartData, tableColumns, tableData) => `<uu5string/>
    <UU5.Bricks.Lsi>
        <UU5.Bricks.Lsi.Item language="en">
            <UU5.Bricks.Section contentEditable colorSchema=null level="3" header="${range.header}">
                <UuContentKit.Bricks.BlockDefault>
                    <UU5.RichText.Block uu5string="Last update on ${new Date()}"/>
                </UuContentKit.Bricks.BlockDefault>
                <UuContentKit.Bricks.BlockInfo>
                    <UU5.RichText.Block uu5string="${range.description}"/>
                </UuContentKit.Bricks.BlockInfo>
                <UU5.Bricks.Accordion onClickNotCollapseOthers 
                    content="<uu5string/>
                        <UU5.Bricks.Panel 
                            expanded 
                            colorSchemaHeader=\\"blue-grey-rich\\" 
                            bgStyleHeader=\\"outline\\" 
                            bgStyleContent=\\"transparent\\" 
                            header=\\"Graph\\" 
                            mountContent=\\"onEachExpand\\"
                            colorSchemaContent=\\"teal\\"
                        >
                            <UU5.SimpleChart.LineChart 
                                series='<uu5json/>${escapeUu5StringArray(chartSeries)}'
                                data='<uu5json/>${escapeUu5StringArray(chartData)}' 
                                valueUnit=\\"\\" 
                                labelUnit=\\"\\" 
                                displayLegend=\\"bottom-center\\" 
                                chartType=\\"natural\\"
                            />
                        </UU5.Bricks.Panel>
                        <UU5.Bricks.Panel 
                            colorSchemaHeader=\\"blue-grey-rich\\" 
                            bgStyleHeader=\\"outline\\" 
                            bgStyleContent=\\"transparent\\" 
                            header=\\"Data\\" 
                            mountContent=\\"onEachExpand\\" 
                            colorSchemaContent=\\"\\"
                        >
                            <Uu5TilesBricks.Table 
                                columns='<uu5json/>${escapeUu5StringArray(tableColumns)}' 
                                data='<uu5json/>${escapeUu5StringArray(tableData)}'
                            />
                        </UU5.Bricks.Panel>" 
                    mountPanelContent="onEachExpand"
                />
            </UU5.Bricks.Section>
        </UU5.Bricks.Lsi.Item>
    </UU5.Bricks.Lsi>`

module.exports = template;