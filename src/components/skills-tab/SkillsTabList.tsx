import React, { useState } from 'react'
import { Box, List, ListItemButton, ListItemText, ListItem } from '@mui/material'
import { ExpandMore, ExpandLess } from '@mui/icons-material'
import { get, update } from 'lodash'
import Categories from './models/Categories.interface'
import SkillsMatrix from './models/SkillsMatrix.interface'
import CreateSkillsDropdown from './CreateSkillsDropdown'
import HandleDropdownMenu from './HandleDropdownMenu'
import CreateSubItemsDropdown from './CreateSubItemsDropdown'

export default function SkillsTabList() {
  /* you can pass a custom object to the iterate function 
  and it will return a nested list, but take note 
  that the structure and the property names have to be the same, 
  there is an example 'testing below'*/
  // Lists cannot have the same name
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
          Others2: {
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
  const [categoriesState, setCategoriesState] = useState<Categories>(categoriesStateObj)

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
                HandleDropdownMenu(skillsMatrixObj.name, categoriesState, setCategoriesState)
              }}
              style={{ height: '72px' }}
            >
              <ListItemText
                primary={skillsMatrixObj.name}
                disableTypography
                sx={{ fontWeight: '500' }}
              />
              {get(categoriesState, `${skillsMatrixObj.name}`) ? (
                <ExpandLess />
              ) : (
                <ExpandMore sx={{ transform: 'rotate(-90deg)' }} />
              )}
            </ListItemButton>
          </ListItem>
          {CreateSkillsDropdown(
            'skillsList',
            skillsMatrixObj.name,
            skillsMatrixObj,
            categoriesState,
          )}
        </List>
        {CreateSubItemsDropdown(
          'subItems',
          skillsMatrixObj.name,
          skillsMatrixObj,
          0,
          categoriesState,
          setCategoriesState,
          categoriesStateObj,
        )}
      </>
    )
  }

  return (
    <>
      <Box sx={{ width: '1176px', marginTop: '100px' }}>{CreateNestedList(testing)}</Box>
    </>
  )
}
