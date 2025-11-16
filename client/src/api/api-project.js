const create = async(project, credentials) => {
    try {
        let response = await fetch('/api/projects', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify(project)
        })
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Request failed' }));
            return { error: errorData.error || `Error: ${response.status}` };
        }
        
        return await response.json()
    } catch (err) {
        console.error('Create project error:', err)
        return { error: 'Unable to create project. Please try again.' }
    }
}

const list = async(credentials, signal) => {
    try {
        let response = await fetch('/api/projects', {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Request failed' }));
            return { error: errorData.error || `Error: ${response.status}` };
        }
        
        return await response.json()
    } catch (err) {
        if (err.name === 'AbortError') {
            console.log('Fetch aborted')
            return { error: 'Request cancelled' }
        }
        console.error('List projects error:', err)
        return { error: 'Unable to load projects. Please try again.' }
    }
}

const read = async(params, credentials, signal) => {
    try {
        let response = await fetch('/api/projects/' + params.projectId, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Request failed' }));
            return { error: errorData.error || `Error: ${response.status}` };
        }
        
        return await response.json()
    } catch (err) {
        if (err.name === 'AbortError') {
            console.log('Fetch aborted')
            return { error: 'Request cancelled' }
        }
        console.error('Read project error:', err)
        return { error: 'Unable to load project. Please try again.' }
    }
}

const update = async(params, credentials, project) => {
    try {
        let response = await fetch('/api/projects/' + params.projectId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify(project)
        })
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Request failed' }));
            return { error: errorData.error || `Error: ${response.status}` };
        }
        
        return await response.json()
    } catch (err) {
        console.error('Update project error:', err)
        return { error: 'Unable to update project. Please try again.' }
    }
}

const remove = async(params, credentials) => {
    try {
        let response = await fetch('/api/projects/' + params.projectId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Request failed' }));
            return { error: errorData.error || `Error: ${response.status}` };
        }
        
        return await response.json()
    } catch (err) {
        console.error('Delete project error:', err)
        return { error: 'Unable to delete project. Please try again.' }
    }
}

const removeAll = async(credentials) => {
    try {
        let response = await fetch('/api/projects', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Request failed' }));
            return { error: errorData.error || `Error: ${response.status}` };
        }
        
        return await response.json()
    } catch (err) {
        console.error('Delete all projects error:', err)
        return { error: 'Unable to delete projects. Please try again.' }
    }
}

export { create, list, read, update, remove, removeAll }