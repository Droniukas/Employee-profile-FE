import React, { useState } from 'react'
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
import Categories from './models/Categories.interface'
import SkillsMatrix from './models/SkillsMatrix.interface'

export default function SkillsTabList() {
  /* you can pass a custom object to the iterate function 
  and it will return a nested list, but take note 
  that the structure and the property names have to be the same, 
  there is an example 'testing below'*/
  // obj example
  const testing = {
    name: 'Testing',
    subItems: {
      Others: {
        name: 'Others',
        skillsList: ['Regresion testing', 'Functional testing'],
      },
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
          Others: {
            name: 'Others',
            skillsList: ['Compatibility testing', 'Usability testing', 'Maintainability testing'],
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
    },
  }

  // useState
  const categoriesStateObj: Categories = {}
  const [categoriesState, setCategoriesState] = useState(categoriesStateObj)
  function HandleDropdownMenu(name: string): void {
    get(categoriesState, `${name}`)
      ? update(categoriesState, `${name}`, () => false)
      : update(categoriesState, `${name}`, () => true)
    setCategoriesState((prevStateObj) => {
      return { ...prevStateObj }
    })
  }

  // main function
  function CreateNestedList(skillsMatrixObj: SkillsMatrix) {
    categoriesStateObj[skillsMatrixObj.name] = false
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
          }}
        >
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                HandleDropdownMenu(skillsMatrixObj.name)
              }}
              style={{ height: '72px', backgroundColor: 'white', borderRadius: '10px'}}
            >
              <ListItemText
                primary={skillsMatrixObj.name}
                disableTypography
                sx={{ fontWeight: '500' }}
              />
              {get(categoriesState, `${skillsMatrixObj.name}`) ? (
                <ExpandLess />
              ) : (
                <ExpandMore sx={{ transform: 'rotate(-90deg)'}} />
              )}
            </ListItemButton>
          </ListItem>
          {CreateSkillsDropdown('skillsList', skillsMatrixObj.name, skillsMatrixObj)}
        </List>
        {CreateSubItemsDropdown('subItems', skillsMatrixObj.name, skillsMatrixObj, 0)}
      </>
    )
  }

  function CreateSkillsDropdown(
    skillsListPath: string,
    categoryKeyForUseState: string,
    skillsMatrixObj: SkillsMatrix,
  ) {
    // path ending in .skillsList
    if (Array.isArray(get(skillsMatrixObj, skillsListPath))) {
      return get(skillsMatrixObj, skillsListPath).map((skillItemName: string) => {
        return (
          <>
            <Collapse in={get(categoriesState, categoryKeyForUseState)}>
              <ListItem disablePadding sx={{ marginLeft: '27px' }}>
                <FormControlLabel control={<Checkbox defaultValue={'false'} />} label='' />
                <ListItemText
                  primary={skillItemName}
                  sx={{ fontWeight: '400', paddingLeft: '0px', marginLeft: '0px' }}
                ></ListItemText>
              </ListItem>
            </Collapse>
          </>
        )
      })
    }
  }
  function CreateSubItemsDropdown(
    subItemsPath: string,
    categoryKeyForUseState: string,
    skillsMatrixObj: SkillsMatrix,
    indent: number,
  ) {
    // path ending in .subItems
    if (get(skillsMatrixObj, subItemsPath)) {
      // this takes the lenght of the path we are on and calculates the left-margin for the dropdown
      // deeper levels are indented more so the longer the path is the more indent the dropdown has
      // at the end of this function we pass it as the indent param for this function
      // foo is just a placeholder path because it's easier to understand than adding +2 to the lenght :D
      const marginLeft = (`${subItemsPath}.foo.foo`.split('.').length - 1) * 15
      return Object.keys(
        get(skillsMatrixObj, subItemsPath) ?? get(skillsMatrixObj, subItemsPath),
      ).map((deeperCategoryKey) => {
        categoriesStateObj[deeperCategoryKey] = false
        return (
          <>
            <Collapse in={get(categoriesState, `${categoryKeyForUseState}`)}>
              <List
                disablePadding
                sx={{
                  border: 1,
                  borderRadius: '10px',
                  marginTop: '10px',
                  marginBottom: '10px',
                  borderColor: '#DDDDDD',
                  color: 'primary.main',
                  backgroundColor: 'white',
                }}
              >
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      HandleDropdownMenu(deeperCategoryKey)
                    }}
                    style={{ height: '72px', backgroundColor: 'white', borderRadius: '10px'}}
                  >
                    <ListItemText
                      primary={get(skillsMatrixObj, `${subItemsPath}.${deeperCategoryKey}.name`)}
                      disableTypography
                      sx={{ fontWeight: '500', backgroundColor: 'white', borderRadius: '10px'}}
                    />
                    {get(categoriesState, `${deeperCategoryKey}`) ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore sx={{ transform: 'rotate(-90deg)' }} />
                    )}
                  </ListItemButton>
                </ListItem>
                {CreateSkillsDropdown(
                  `${subItemsPath}.${deeperCategoryKey}.skillsList`,
                  deeperCategoryKey,
                  skillsMatrixObj,
                )}
              </List>
              {CreateSubItemsDropdown(
                `${subItemsPath}.${deeperCategoryKey}.subItems`,
                deeperCategoryKey,
                skillsMatrixObj,
                marginLeft,
              )}
            </Collapse>
          </>
        )
      })
    }
  }

  return (
    <>
      <Box sx={{ width: '1176px', marginTop: '100px' }}>{CreateNestedList(testing)}</Box>
    </>
  )
}
