import React, { useState } from 'react'
// import Icon from '@mui/material/Icon';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  ListItem,
  FormControlLabel,
  Checkbox,
} from '@mui/material'
import { ExpandMore, ExpandLess } from '@mui/icons-material'
import { get, update } from 'lodash'

export default function SkillsTabList() {
  /* you can pass a custom object  to the iterate function 
  and it will return a nested list, object example,
  take note that the structure and the property names have to be the same  */
  // obj example
  const testing = {
    name: 'Testing',
    subItems: {
      AutomationTesting: {
        name: 'Automation testing',
        subItems: {
          TestAutomationFrameworks: {
            name: 'Test automation frameworks',
            // prettier-ignore
            skillsList: ['Selenium', 'Cypress', 'Robot', 'Playwright', 'Appium', 'Cucumber', 'Puppeteer', 'Nightwatch', 'Selenide', 'WebdriverIO', 'RestAssured', 'RestSharp', 'HttpClient'],
          },
          ProgrammingLanguages: {
            name: 'Programming languages',
            skillsList: ['Java', 'C#', 'Javascript', 'Typescript', 'Kotlin', 'Ruby', 'Python'],
          },
          ReportingTools: {
            name: 'Reporting tools',
            skillsList: ['Allure', 'ReportPortal'],
          },
        },
      },
      NonFunctionalTesting: {
        name: 'Non-functional testing',
        subItems: {
          CompatibilityTesting: {
            name: 'Compatibility testing',
          },
          UsabilityTesting: {
            name: 'Usability testing',
          },
          MaintainabilityTesting: {
            name: 'Maintainability testing',
          },
          PerformanceTesting: {
            name: 'Performance testing',
            skillsList: ['Jmeter', 'K6', 'Gatling', 'Lighthouse audit'],
          },
          SecurityTesting: {
            name: 'Security testing',
            skillsList: ['OWASP/OWASP ZAP', 'BURP Suite'],
          },
          AccessibilityTesting: {
            name: 'Accessibility testing',
            skillsList: ['WCAG', 'standards', 'JAWS', 'VoiceOver', 'NVDA', 'AXE'],
          },
        },
      },
      RegresionTesting: {
        name: 'Regresion testing',
      },
      FunctionalTesting: {
        name: 'Functional testing',
        skillsList: ['WCAG', 'standards', 'JAWS', 'VoiceOver', 'NVDA', 'AXE'],
      },
    },
  }

  // useState
  type Categories = { [key: string]: boolean }
  const categoriesOpen: Categories = {}
  const [open, setOpen] = useState(categoriesOpen)
  function handleClick(name: string): void {
    get(open, `${name}`)
      ? update(open, `${name}`, () => false)
      : update(open, `${name}`, () => true)
    setOpen((prev) => {
      return { ...prev }
    })
  }

  // main function
  function iterate(obj: any) {
    categoriesOpen[obj.name] = false
    return (
      <>
        <List
          disablePadding
          sx={{
            border: 1,
            borderRadius: '10px',
            marginTop: '10px',
            marginBottom: '10px',
            borderColor: '#DDDDDD',
            color: 'primary.main',
            backgroundColor:'white'
          }}
        >
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleClick(obj.name)
              }}
              style={{ height: '72px', backgroundColor:'white' }}
            >
              <ListItemText primary={obj.name} disableTypography sx={{ fontWeight: '500'}} />
              {get(open, `${obj.name}`) ? (
                <ExpandLess />
              ) : (
                <ExpandMore sx={{ transform: 'rotate(-90deg)' }} />
              )}
            </ListItemButton>
          </ListItem>
          {createSkillsList('skillsList', obj.name, obj)}
        </List>
        {createSubItem('subItems', obj.name, obj, 0)}
      </>
    )
  }

  function createSkillsList(path: string, key: string, obj: any) {
    // path ending in .skillsList
    if (Array.isArray(get(obj, path))) {
      return get(obj, path).map((item: string) => {
        return (
          <>
            <Collapse in={get(open, key)}>
              <ListItem disablePadding sx={{ marginLeft: '27px' }}>
                <FormControlLabel control={<Checkbox defaultValue={'false'} />} label='' />
                <ListItemText
                  primary={item}
                  sx={{ fontWeight: '400', paddingLeft: '0px', marginLeft: '0px' }}
                ></ListItemText>
              </ListItem>
            </Collapse>
          </>
        )
      })
    }
  }
  function createSubItem(path: string, key: string, obj: any, counter: number) {
    // path ending in .subItems
    if (get(obj, path)) {
      const indent = (`${path}.foo.foo`.split('.').length - 1) * 15
      return Object.keys(get(obj, path)!).map((key2) => {
        categoriesOpen[key2] = false
        return (
          <>
            <Collapse in={get(open, `${key}`)}>
              <List
                disablePadding
                sx={{
                  border: 1,
                  borderRadius: '10px',
                  marginTop: '10px',
                  marginBottom: '10px',
                  // marginLeft: `${30 + counter}px`,
                  borderColor: '#DDDDDD',
                  color: 'primary.main',
                  backgroundColor:'white'
                }}
              >
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      handleClick(key2)
                    }}
                    style={{ height: '72px' }}>
                      
                    <ListItemText
                      primary={get(obj, `${path}.${key2}.name`)!}
                      disableTypography
                      sx={{ fontWeight: '500' }}
                    />
                    {get(open, `${key2}`) ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore sx={{ transform: 'rotate(-90deg)' }} />
                    )}
                  </ListItemButton>
                </ListItem>
                {createSkillsList(`${path}.${key2}.skillsList`, key2, obj)}
              </List>
              {createSubItem(`${path}.${key2}.subItems`, key2, obj, indent)}
            </Collapse>
          </>
        )
      })
    }
  }

  return (
    <>
      <Box sx={{ width: '80vw', marginTop: '70px' }}>{iterate(testing)}</Box>
    </>
  )
}
