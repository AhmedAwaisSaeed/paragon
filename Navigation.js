import { Navigation } from 'react-native-navigation';

export const goHome = () => Navigation.setRoot({
    root: {
      stack: {
        id: 'Login',
        children: [
          {
            component: {
              name: 'Login',
            }
          }
      ],
    
      }
    }
  })


  export const goToAuth = () =>

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
                backgroundColor: 'white',
                  // drawBehind: true,
                 visible: true,
                // style: 'dark'
              },
            
              bottomTabs: { visible: true,animate: false,drawBehind: false}, 
              bottomTab: {
               text: 'Home',
                icon: require('./src/assets/home2.png'),
                // icon: require('./src/assets/home.svg'),
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
    
                  // statusBar: {
                  //   backgroundColor: 'white',
                  //    drawBehind: true,
                  //   visible: false,
                  // },
            
                  bottomTabs: { visible: true,animate: false,drawBehind: false}, 
                  bottomTab: {
                    // scale: 5,
                     text: 'Projects',
                    icon: require('./src/assets/folder2.png'),
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
    
                  // statusBar: {
                  //     drawBehind: true,
                  //   visible: false,
                  // },
                
                  bottomTabs: { visible: true,animate: false,drawBehind: false}, 
                  bottomTab: {
                    // scale: 5,
                     text: 'Staff',
                    icon: require('./src/assets/staff.png'),
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
  
                // statusBar: {
                //  drawBehind: true,
                //  visible: false,
                // },
                layout: {
                  // direction: 'ltr', // Supported directions are: 'rtl', 'ltr'
                  backgroundColor: 'white',
                  // orientation: ['portrait', 'landscape'] // An array of supported orientations
                },
                bottomTabs: { visible: true,animate: false,drawBehind: false}, 
                bottomTab: {
                  // scale: 5,
                   text: 'Reports',
                  icon: require('./src/assets/reports.png'),
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
  
                // statusBar: {
                //    drawBehind: true,
                //  visible: false,
                // },
                layout: {
                  // direction: 'ltr', // Supported directions are: 'rtl', 'ltr'
                  backgroundColor: 'white',
                  // orientation: ['portrait', 'landscape'] // An array of supported orientations
                },
                bottomTabs: { visible: true,animate: false,drawBehind: false}, 
                bottomTab: {
                  // scale: 5,
                   text: 'Accounts',
                  icon: require('./src/assets/controls2.png'),
                  testID: 'SECOND_TAB_BAR_BUTTON',
                  selectedIconColor: '#273D6F',
                },
                
              },
          
          }
        }],
      }
      }
   
     
    
    
    ],

    options: {
      bottomTabs: {
        animate: false,
        //  titleDisplayMode: 'alwaysHide'
        titleDisplayMode: 'alwaysShow' 
      }
    }
      
      }
    }
  });


 

  


  export const goToEmployeeApp = (emp_id) =>  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'BottomTabsId',
        children: [{
          stack: {
            children: [{
              component: {
                id:"EmployeeDashboardId",
                name: 'EmployeeDashboard',
                passProps: {
                   idOfEmployee:emp_id
                }
              }
            }],
            options: {
              
            
              layout: {
                // direction: 'ltr', // Supported directions are: 'rtl', 'ltr'
                backgroundColor: '#2D4374',
                // orientation: ['portrait', 'landscape'] // An array of supported orientations
              },
              bottomTab: {
               text: 'Home',
              
                icon: require('./src/assets/home2.png'),
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
                          id: 'EmployeeReportsScreenId',
                          name: 'EmployeeReports',
                          //  name: 'BottomTabFour',
                passProps: {
                  response:emp_id
                },
                options: {
    
               
                  layout: {
                    // direction: 'ltr', // Supported directions are: 'rtl', 'ltr'
                    backgroundColor: 'white',
                    // orientation: ['portrait', 'landscape'] // An array of supported orientations
                  },
                  // bottomTabs: { visible: true,animate: false,drawBehind: false}, 
                  bottomTab: {
                    // scale: 3,
                     text: 'Reports',
                    icon: require('./src/assets/reports.png'),
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

                id: 'EmployeeAccountsScreenId',
                           name: 'EmployeeAccounts',
                        
                            // name: 'BottomTabFour',
                passProps: {
                  text: 'This is tab 2'
                },
                options: {
    
               
                  layout: {
                    // direction: 'ltr', // Supported directions are: 'rtl', 'ltr'
                    backgroundColor: 'white',
                    // orientation: ['portrait', 'landscape'] // An array of supported orientations
                  },
                  // bottomTabs: { visible: true,animate: false,drawBehind: false,}, 
                  bottomTab: {
                    // scale: 3,
                     text: 'Accounts',
                    
                    icon: require('./src/assets/controls2.png'),
                    testID: 'SECOND_TAB_BAR_BUTTON',
                    selectedIconColor: '#273D6F',
                    
                  },
                  
                },
            
            }
          }],
        }
          
          
        },
        

     

      
   
     
    
    
    ],
    options: {
      bottomTabs: {
        animate: false,
        //  titleDisplayMode: 'alwaysHide'
        titleDisplayMode: 'alwaysShow',
        visible:true 
      }
    }
      
      }
    }
  });



  // Manager side /////////////////////// Project start




  export const goToManagerAppinitialProject = (manager_id) =>

  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'BottomTabsId',
        children: [{
          stack: {
            children: [{
              component: {
                id: 'WelcomeScreenId',
                name: 'ManagerDashboard',
                passProps: {
                  response: manager_id
                }
              }
            }],
            options: {
              
              statusBar: {
                backgroundColor: 'white',
                  // drawBehind: true,
                 visible: true,
                // style: 'dark'
              },
            
              bottomTabs: { visible: true,animate: false,drawBehind: false}, 
              bottomTab: {
               text: 'Home',
                icon: require('./src/assets/home2.png'),
                // icon: require('./src/assets/home.svg'),
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
    
                  // statusBar: {
                  //   backgroundColor: 'white',
                  //    drawBehind: true,
                  //   visible: false,
                  // },
            
                  bottomTabs: { visible: true,animate: false,drawBehind: false}, 
                  bottomTab: {
                    // scale: 5,
                     text: 'Projects',
                    icon: require('./src/assets/folder2.png'),
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
    
                  // statusBar: {
                  //     drawBehind: true,
                  //   visible: false,
                  // },
                
                  bottomTabs: { visible: true,animate: false,drawBehind: false}, 
                  bottomTab: {
                    // scale: 5,
                     text: 'Staff',
                    icon: require('./src/assets/staff.png'),
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
  
                // statusBar: {
                //  drawBehind: true,
                //  visible: false,
                // },
                layout: {
                  // direction: 'ltr', // Supported directions are: 'rtl', 'ltr'
                  backgroundColor: 'white',
                  // orientation: ['portrait', 'landscape'] // An array of supported orientations
                },
                bottomTabs: { visible: true,animate: false,drawBehind: false}, 
                bottomTab: {
                  // scale: 5,
                   text: 'Reports',
                  icon: require('./src/assets/reports.png'),
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
  
                // statusBar: {
                //    drawBehind: true,
                //  visible: false,
                // },
                layout: {
                  // direction: 'ltr', // Supported directions are: 'rtl', 'ltr'
                  backgroundColor: 'white',
                  // orientation: ['portrait', 'landscape'] // An array of supported orientations
                },
                bottomTabs: { visible: true,animate: false,drawBehind: false}, 
                bottomTab: {
                  // scale: 5,
                   text: 'Accounts',
                  icon: require('./src/assets/controls2.png'),
                  testID: 'SECOND_TAB_BAR_BUTTON',
                  selectedIconColor: '#273D6F',
                },
                
              },
          
          }
        }],
      }
      }
   
     
    
    
    ],

    options: {
      bottomTabs: {
        animate: false,
        //  titleDisplayMode: 'alwaysHide'
        titleDisplayMode: 'alwaysShow' 
      }
    }
      
      }
    }
  });



  


