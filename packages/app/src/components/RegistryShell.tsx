import { AppShell, NavLink } from '@mantine/core';
import { IconTable, IconReportAnalytics } from '@tabler/icons-react';
import { useAkello } from "@akello/react-hook";
import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';
import { Registry } from '@akello/core';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import PatientDetail from './PatientDetail';

const RegistryShell = () => {
    const akello = useAkello();
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const [opened, { toggle }] = useDisclosure();

    useEffect(() => {        
        akello.userService.getUserRegistries((data) => {
            const registeries = data.map((registry: any) => {                                
                return new Registry(
                    registry['id'],
                    registry['name'],
                    registry['description'],
                    registry['active_patients'],
                    registry['members'],
                    registry['questionnaires'],
                    {
                        total_minutes: registry['total_minutes'],
                        completed_minutes: registry['completed_minutes'],
                        safety_risk: registry['safety_risk']
                    }
                );
            });            
            if(registeries.length == 0) { 
                navigate('/create-registry');
            } else {                
                akello.selectRegistry(registeries[0]);
            }
        });
    }, []);
    return (
        <AppShell
            className={'w-screen'}
            transitionDuration={0}
            header={{ height: 60 }}
            navbar={{
                width: 200,
                breakpoint: 'sm',
                collapsed: {
                    desktop: false,
                    mobile: !opened,
                },
            }}
            aside={{
                width: pathname.indexOf('registry') != -1 ? 500 : 0,                
                collapsed: {
                    desktop: false,
                    mobile: true,
                },
                breakpoint: 'md',
            }}
            padding="md"
        >            
            <Header loggedIn={true}  opened={opened} toggle={toggle}/>
            <AppShell.Navbar>                
                <NavLink
                    onClick={() => {
                        const selectedRegistry = akello.getSelectedRegistry();
                        if (selectedRegistry) {
                            navigate('/registry');
                        }
                        toggle();
                    }}
                    label="Registry"
                    leftSection={<IconTable size="1rem" stroke={1.5} />}
                    active={window.location.pathname.indexOf('registry') != -1}
                />                
                <NavLink
                    onClick={() => {
                        const selectedRegistry = akello.getSelectedRegistry();
                        if (selectedRegistry) {
                            navigate('/reports');
                        }
                        toggle();
                    }}
                    label="Billing Report"
                    leftSection={<IconReportAnalytics size="1rem" stroke={1.5} />}
                    active={window.location.pathname === '/reports'}
                />                
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />                 
            </AppShell.Main>
            <AppShell.Aside>
                <PatientDetail />
            </AppShell.Aside>
        </AppShell>
    );
};

export default RegistryShell;