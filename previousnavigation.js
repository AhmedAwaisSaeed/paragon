/**
 * @format
 */

import { Navigation } from "react-native-navigation";
import {AppRegistry} from 'react-native';
import App from "./App";
// import Testing from "./Testing";
// import MapsTesting from "./MapsTesting";
import {name as appName} from './app.json';
import ForgotPassword from "./src/screens/ForgotPassword";
import Login from "./src/screens/Login";
import Dashboard from "./src/screens/Dashboard";
import BottomTabTwo from "./src/screens/BottomTabTwo";
import BottomTabThree from "./src/screens/BottomTabThree";
import BottomTabFour from "./src/screens/BottomTabFour";
import BottomTabFive from "./src/screens/BottomTabFive";
import Projects from "./src/screens/Projects";
import ProjectDetails from "./src/screens/ProjectDetails";
import EditProject from "./src/screens/EditProject";
import Staff from "./src/screens/Staff";
import StaffDetails from "./src/screens/StaffDetails";
import AddStaff from "./src/screens/AddStaff";
import EditStaff from "./src/screens/EditStaff";
import InActiveStaff from "./src/screens/InactiveStaff";
import AddProject from "./src/screens/AddProject";
import PayRoll from "./src/screens/PayRoll";
import Accounts from "./src/screens/Accounts";
import Reports from "./src/screens/Reports";
import AddNewManager from "./src/screens/AddNewManager";
import InActiveManagers from "./src/screens/InActiveManagers";
import EditManager from "./src/screens/EditManager";
import ManagerDetails from "./src/screens/ManagerDetails";
import ImagePickerTesting from "./src/screens/ImagePickerTesting";
import AdminEditProfile from "./src/screens/AdminEditProfile";
import Legal from "./src/screens/Legal";
import SendFeedback from "./src/screens/SendFeedback";
import ContactSupport from "./src/screens/ContactSupport";
import ChatWithUs from "./src/screens/ChatWithUs";
import HowParagonWorks from "./src/screens/HowParagonWorks";
import ChangePassword from "./src/screens/ChangePassword";
import EmployeeReports from "./src/screens/EmployeeSceens/EmployeeReports";
import EmployeeAccounts from "./src/screens/EmployeeSceens/EmployeeAccounts";
import EmployeeEditProfile from "./src/screens/EmployeeSceens/EmployeeEditProfile";
import EmployeeDashboard from "./src/screens/EmployeeSceens/EmployeeDashboard";
import EmployeeDashboardCheckout from "./src/screens/EmployeeSceens/EmployeeDashboardCheckout";
import EmployeeSelectProject from "./src/screens/EmployeeSceens/EmployeeSelecteProject";



Navigation.registerComponent(`navigation.playground.WelcomeScreen`, () => App);

Navigation.registerComponent(`ForgotPassword`, () => ForgotPassword);
Navigation.registerComponent(`Login`, () => Login);
// Navigation.registerComponent(`MapsTesting`, () => MapsTesting);
// Navigation.registerComponent(`testing`, () => Testing);
Navigation.registerComponent(`Dashboard`, () => Dashboard);
Navigation.registerComponent(`Projects`, () => Projects);
Navigation.registerComponent(`Staff`, () => Staff);
Navigation.registerComponent(`EditStaff`, () => EditStaff);
Navigation.registerComponent(`StaffDetails`, () => StaffDetails);
Navigation.registerComponent(`AddStaff`, () => AddStaff);
Navigation.registerComponent(`InActiveStaff`, () => InActiveStaff);
Navigation.registerComponent(`AddProject`, () => AddProject);
Navigation.registerComponent(`PayRoll`, () => PayRoll);
Navigation.registerComponent(`ProjectDetails`, () => ProjectDetails);
Navigation.registerComponent(`EditProject`, () => EditProject);
Navigation.registerComponent(`Accounts`, () => Accounts);
Navigation.registerComponent(`Reports`, () => Reports);
Navigation.registerComponent(`AddNewManager`, () => AddNewManager);
Navigation.registerComponent(`InActiveManagers`, () => InActiveManagers);
Navigation.registerComponent(`ManagerDetails`, () => ManagerDetails);
Navigation.registerComponent(`EditManager`, () => EditManager);
Navigation.registerComponent(`BottomTabTwo`, () => BottomTabTwo);
Navigation.registerComponent(`BottomTabThree`, () => BottomTabThree);
Navigation.registerComponent(`BottomTabFour`, () => BottomTabFour);
Navigation.registerComponent(`BottomTabFive`, () => BottomTabFive);
Navigation.registerComponent(`ImagePickerTesting`, () => ImagePickerTesting);
Navigation.registerComponent(`AdminEditProfile`, () => AdminEditProfile);
Navigation.registerComponent(`Legal`, () => Legal);
Navigation.registerComponent(`SendFeedback`, () => SendFeedback);
Navigation.registerComponent(`ContactSupport`, () => ContactSupport);
Navigation.registerComponent(`ChatWithUs`, () => ChatWithUs);
Navigation.registerComponent(`HowParagonWorks`, () => HowParagonWorks);
Navigation.registerComponent(`ChangePassword`, () => ChangePassword);


Navigation.registerComponent(`EmployeeReports`, () => EmployeeReports );
Navigation.registerComponent(`EmployeeAccounts`, () => EmployeeAccounts );
Navigation.registerComponent(`EmployeeEditProfile`, () => EmployeeEditProfile);
Navigation.registerComponent(`EmployeeDashboard`, () => EmployeeDashboard);
Navigation.registerComponent(`EmployeeDashboardCheckout`, () => EmployeeDashboardCheckout);
Navigation.registerComponent(`EmployeeSelectProject`, () => EmployeeSelectProject);


Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      visible: false,
      drawBehind: true,
      animate: false,
    },
      bottomTabs: { visible: false, drawBehind: false, animate: false,titleDisplayMode: 'alwaysHide'
      
     } 
  })

  


  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [{
          stack: {
            children: [{
              component: {
                id: 'WelcomeScreenId',
                name: 'Dashboard',
                passProps: {
                  text: 'This is tab 1'
                }
              }
            }],
            options: {
              
              statusBar: {
                visible: false,
                style: 'light-content'
              },
              layout: {
                // direction: 'ltr', // Supported directions are: 'rtl', 'ltr'
                backgroundColor: '#2D4374',
                // orientation: ['portrait', 'landscape'] // An array of supported orientations
              },
              bottomTab: {
                // text: 'Tab 1',
                icon: require('./src/assets/bottom1before.png'),
                testID: 'FIRST_TAB_BAR_BUTTON',
                selectedIconColor: '#273D6F',
              }
              
            }
          }
        }, 
        {
          stack: {
            children: [{
              component: {
                        id: 'ProjectsScreenId',
                           name: 'Projects',
                          //  name: 'BottomTabFour',
                passProps: {
                  text: 'This is tab 2'
                },
                options: {
    
                  statusBar: {
                    visible: false,
                    style: 'light'
                  },
                  layout: {
                    // direction: 'ltr', // Supported directions are: 'rtl', 'ltr'
                    backgroundColor: 'white',
                    // orientation: ['portrait', 'landscape'] // An array of supported orientations
                  },
                  bottomTabs: { visible: true,animate: false,drawBehind: false}, 
                  bottomTab: {
                    scale: 5,
                    // text: 'Tab 2',
                    icon: require('./src/assets/bottom2before.png'),
                    testID: 'SECOND_TAB_BAR_BUTTON',
                    selectedIconColor: '#273D6F',
                  },
                  
                },
            
            }
          }],
        }
          
          
        },
        {
          stack: {
            children: [{
              component: {
                id: 'StaffScreenId',
                          name: 'Staff',
                          //  name: 'BottomTabFour',
                passProps: {
                  text: 'This is tab 2'
                },
                options: {
    
                  statusBar: {
                    visible: false,
                    style: 'light'
                  },
                  layout: {
                    // direction: 'ltr', // Supported directions are: 'rtl', 'ltr'
                    backgroundColor: 'white',
                    // orientation: ['portrait', 'landscape'] // An array of supported orientations
                  },
                  bottomTabs: { visible: true,animate: false,drawBehind: false}, 
                  bottomTab: {
                    scale: 5,
                    // text: 'Tab 2',
                    icon: require('./src/assets/bottom3before.png'),
                    testID: 'SECOND_TAB_BAR_BUTTON',
                    selectedIconColor: '#273D6F',
                  },
                  
                },
            
            }
          }],
        }
        }
      ,

      {
        stack: {
          children: [{
            component: {
                         name: 'Reports',
                        // name: 'BottomTabFour',
              passProps: {
                text: 'This is tab 2'
              },
              options: {
  
                statusBar: {
                  visible: false,
                  style: 'light'
                },
                layout: {
                  // direction: 'ltr', // Supported directions are: 'rtl', 'ltr'
                  backgroundColor: 'white',
                  // orientation: ['portrait', 'landscape'] // An array of supported orientations
                },
                bottomTabs: { visible: true,animate: false,drawBehind: false}, 
                bottomTab: {
                  scale: 5,
                  // text: 'Tab 2',
                  icon: require('./src/assets/bottom4before.png'),
                  testID: 'SECOND_TAB_BAR_BUTTON',
                  selectedIconColor: '#273D6F',
                },
                
              },
          
          }
        }],
      }
      },

      {
        stack: {
          children: [{
            component: {
              id:"AccountScreenId",
                         name: 'Accounts',
                        // name: 'BottomTabFour',
              passProps: {
                text: 'This is tab 2'
              },
              options: {
  
                statusBar: {
                  visible: false,
                  style: 'light'
                },
                layout: {
                  // direction: 'ltr', // Supported directions are: 'rtl', 'ltr'
                  backgroundColor: 'white',
                  // orientation: ['portrait', 'landscape'] // An array of supported orientations
                },
                // bottomTabs: { visible: true,animate: false,drawBehind: false}, 
                bottomTab: {
                  // scale: 5,
                  // text: 'Tab 2',
                  icon: require('./src/assets/bottom5before.png'),
                  testID: 'SECOND_TAB_BAR_BUTTON',
                  selectedIconColor: '#273D6F',
                },
                
              },
          
          }
        }],
      }
      }
   
     
    
    
    ]
      
      }
    }
  });

  // Navigation.setRoot({
  //   root: {
  //     bottomTabs: {
  //       children: [{
  //         stack: {
  //           children: [{
  //             component: {
  //               name: 'navigation.playground.WelcomeScreen',
  //               passProps: {
  //                 text: 'This is tab 1'
  //               }
  //             }
  //           }],
  //           options: {
  //             bottomTab: {
  //               text: 'Tab 1',
  //               icon: require('./src/assets/react.png'),
  //               testID: 'FIRST_TAB_BAR_BUTTON'
  //             }
  //           }
  //         }
  //       }]
  //     }
  //   }
  // });

   
   
  });

