pipeline {
	agent {
		dockerfile {
			filename './Dockerfile'
			args '-u 0:0'
		}
	}
	post {
		failure {
			updateGitlabCommitStatus name: 'Test', state: 'failed'
		}
		success {
			updateGitlabCommitStatus name: 'Test', state: 'success'
		}
		cleanup {
			sh 'rm -rf *'
			cleanWs()
		}
	}
	stages {
		stage("checkout") {
			steps {
				checkout scm
					updateGitlabCommitStatus name: 'Test', state: 'pending'
			}
		}
		stage("install front depedencies") {
			steps {
					sh 'npm install'
			}
		}
		stage("run front eslint") {
			steps {
					sh 'npm run eslint'
			}
		}
	}
}
