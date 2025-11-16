import auth from '../user/auth-helper.js';

const create = async(qualification) => {
    try {
        const jwt = auth.isAuthenticated();
        if (!jwt) throw new Error("User is not authorized");
        
        let response = await fetch('/api/qualifications/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt.token
            },
            body: JSON.stringify(qualification)
        })
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Failed to create qualification' }));
            return { error: errorData.error || `Error: ${response.status}` };
        }
        
        return await response.json()
    } catch (err) {
        console.error('Create qualification error:', err)
        return { error: err.message || 'Unable to create qualification' }
    }
}

const list = async(signal) => {
    try {
        const jwt = auth.isAuthenticated();
        if (!jwt) throw new Error("User is not authorized");
        
        let response = await fetch('/api/qualifications/', {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt.token
            }
        })
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Failed to fetch qualifications' }));
            return { error: errorData.error || `Error: ${response.status}` };
        }
        
        return await response.json()
    } catch (err) {
        console.error('List qualifications error:', err)
        return { error: err.message || 'Unable to fetch qualifications' }
    }
}

const read = async(params, credentials, signal) => {
    try {
        let response = await fetch('/api/qualifications/' + params.qualificationId, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Failed to read qualification' }));
            return { error: errorData.error || `Error: ${response.status}` };
        }
        
        return await response.json()
    } catch (err) {
        console.error('Read qualification error:', err)
        return { error: 'Unable to read qualification' }
    }
}

const update = async(params, credentials, qualification) => {
    try {
        let response = await fetch('/api/qualifications/' + params.qualificationId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify(qualification)
        })
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Failed to update qualification' }));
            return { error: errorData.error || `Error: ${response.status}` };
        }
        
        return await response.json()
    } catch (err) {
        console.error('Update qualification error:', err)
        return { error: 'Unable to update qualification' }
    }
}

const remove = async(params, credentials) => {
    try {
        let response = await fetch('/api/qualifications/' + params.qualificationId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Failed to delete qualification' }));
            return { error: errorData.error || `Error: ${response.status}` };
        }
        
        return await response.json()
    } catch (err) {
        console.error('Delete qualification error:', err)
        return { error: 'Unable to delete qualification' }
    }
}

const removeAll = async(credentials) => {
    try {
        let response = await fetch('/api/qualifications/', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Failed to delete all qualifications' }));
            return { error: errorData.error || `Error: ${response.status}` };
        }
        
        return await response.json()
    } catch (err) {
        console.error('Delete all qualifications error:', err)
        return { error: 'Unable to delete all qualifications' }
    }
}

export { create, list, read, update, remove, removeAll }