### `npm run pre-commit`

Once done with your changes and ready to commit, please run this command.

With that your code will be formatted by our code style and you’ll get immediate feedback on what might be off/not per guidelines. Like scss class names or unused variables and such and be sure to fix them where possible.

---

// This is bad

function TabPanel(props: TabPanelProps) { ... }

function setInputValue(val: string) {

...

}

// This is good

const TabPanel = (props: TabPanelProps) => { ... };

const setInputValue = (value: string) => {

...

};

---

// This is bad

const Login: React.FC<LoginProps> = ({ setAppState }) => {

....

}

// This is good

const Login: React.FC<LoginProps> = (props: LoginProps) => {

const { setAppState } = props;

...

## }
