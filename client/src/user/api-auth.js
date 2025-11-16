// api-auth.js - Updated with proper error handling

const signin = async(user) => {
    try {
        let response = await fetch('/auth/signin/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(user)
        })
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Sign in failed' }));
            return { error: errorData.error || `Error: ${response.status}` };
        }
        
        return await response.json()
    } catch (err) {
        console.error('Sign in error:', err)
        return { error: 'Unable to sign in. Please check your connection and try again.' }
    }
}

const signout = async() => {
    try {
        let response = await fetch('/auth/signout/', {
            method: 'GET'
        })
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Sign out failed' }));
            return { error: errorData.error || `Error: ${response.status}` };
        }
        
        return await response.json()
    } catch (err) {
        console.error('Sign out error:', err)
        return { error: 'Unable to sign out properly.' }
    }
}

export { signin, signout }