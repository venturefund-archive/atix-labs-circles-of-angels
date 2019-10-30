import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Label from 'components/atoms/Label/Label';

test('Loads top bar and displays modal login', async () => {
    const [visibility, setVisibility] = useState(false);

    const TopBar = render(
        <TopBar
        textBlack="Register"
        setVisibility={setVisibility}
        visibility={visibility}
        />
    )
    getByText(TopBar, 'Login').click()

});
