import auth from '../user/auth-helper.js';

const create = async(contact) => {
    try {
        const jwt = auth.isAuthenticated();
        if (!jwt) throw new Error("User is not authorized");
        
        let response = await fetch('/api/contacts/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt.token
            },
            body: JSON.stringify(contact)
        })
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Failed to create contact' }));
            return { error: errorData.error || `Error: ${response.status}` };
        }
        
        return await response.json()
    } catch (err) {
        console.error('Create contact error:', err)
        return { error: err.message || 'Unable to create contact' }
    }
}

const list = async(signal) => {
    try {
        let response = await fetch('/api/contacts/', {
            method: 'GET',
            signal: signal,
        })
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Failed to fetch contacts' }));
            return { error: errorData.error || `Error: ${response.status}` };
        }
        
        return await response.json()
    } catch (err) {
        console.error('List contacts error:', err)
        return { error: 'Unable to fetch contacts' }
    }
}

const read = async(params, credentials, signal) => {
    try {
        let response = await fetch('/api/contacts/' + params.contactId, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Failed to read contact' }));
            return { error: errorData.error || `Error: ${response.status}` };
        }
        
        return await response.json()
    } catch (err) {
        console.error('Read contact error:', err)
        return { error: 'Unable to read contact' }
    }
}

const update = async(params, credentials, contact) => {
    try {
        let response = await fetch('/api/contacts/' + params.contactId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify(contact)
        })
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Failed to update contact' }));
            return { error: errorData.error || `Error: ${response.status}` };
        }
        
        return await response.json()
    } catch (err) {
        console.error('Update contact error:', err)
        return { error: 'Unable to update contact' }
    }
}

const remove = async(params, credentials) => {
    try {
        let response = await fetch('/api/contacts/' + params.contactId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Failed to delete contact' }));
            return { error: errorData.error || `Error: ${response.status}` };
        }
        
        return await response.json()
    } catch (err) {
        console.error('Delete contact error:', err)
        return { error: 'Unable to delete contact' }
    }
}

const removeAll = async(credentials) => {
    try {
        let response = await fetch('/api/contacts/', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Failed to delete all contacts' }));
            return { error: errorData.error || `Error: ${response.status}` };
        }
        
        return await response.json()
    } catch (err) {
        console.error('Delete all contacts error:', err)
        return { error: 'Unable to delete all contacts' }
    }
}

export { create, list, read, update, remove, removeAll }