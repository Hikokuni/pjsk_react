import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import ProjectPanel from './ProjectPanel';
import { PJSK_ORIGINAL_CHARACTERS, PJSK_GROUPS, BANDORI_CHARACTERS, BANDORI_GROUPS } from './Data';
import GroupingGame from './GroupingGame';
import shuffleArray from './ShuffleArray';

export default function App() {
    return (
        <Tabs className="bg-neutral-800 rounded-lg p-[1vh]">
            <TabList className="tab-list h-16">
                <Tab className="tab w-40">
                    <img className="tab-image p-2" src='/img/bandori/logo.webp'/>
                </Tab>
                <Tab className="tab w-40">
                    <img className="tab-image" src='/img/pjsk/logo.png'/>
                </Tab>
            </TabList>

            <TabPanel className="tab-panel pl-[1vh] pt-[1vh]">
                <ProjectPanel
                    tabs={[
                        <p className="hover:drop-shadow-md hover:drop-shadow-black hover:scale-120">分组</p>
                    ]}
                    tabPanels={[
                        <GroupingGame
                            characters={shuffleArray(BANDORI_CHARACTERS)}
                            groups={BANDORI_GROUPS}
                            project="bandori"
                        />
                    ]}
                />
            </TabPanel>
            <TabPanel className="tab-panel pl-[1vh] pt-[1vh]">
                <ProjectPanel
                    tabs={[
                        <p className="hover:drop-shadow-md hover:drop-shadow-black hover:scale-120">分组</p>
                    ]}
                    tabPanels={[
                        <GroupingGame
                            characters={shuffleArray(PJSK_ORIGINAL_CHARACTERS)}
                            groups={PJSK_GROUPS}
                            project="pjsk"
                        />
                    ]}
                />
            </TabPanel>
        </Tabs>
    );
}
