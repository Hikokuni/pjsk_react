import { Tabs, TabList, Tab, TabPanel } from "react-tabs";

type ProjectPanelProps = {
    tabs;
    tabPanels;
}

export default function ProjectPanel(project: ProjectPanelProps) {
    return (
        <Tabs className="bg-neutral-800 rounded-l-lg">
            <TabList className="tab-list pt-[1vh]">
                {project.tabs.map(tab => {
                    return(<Tab className="tab">{tab}</Tab>);
                })}
            </TabList>

            {project.tabPanels.map(tabPanel => {
                return(<TabPanel className="tab-panel">{tabPanel}</TabPanel>);
            })}
        </Tabs>
    );
}
