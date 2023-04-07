def globalProperties = {
    ansible: {
        playbooks: {
            branch: 'master',
            credentials: 'git-repos',
            repoUrl: 'git@github.com:luiscarmignotto/devops-ansible-k8s-builds.git'
        },
        roles: {
            branch: 'master',
            credentials: 'git-repos',
            repoUrl: 'git@github.com:luiscarmignotto/devops-ansible-k8s-roles.git'
        }
    }
}