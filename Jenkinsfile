def getDeploymentServer(branch) {
    switch (branch) {
        case ~/^master$/:
            return ''
        case ~/^develop$/:
            return 'root@173.255.254.208'
	default:
            return 'root@173.255.254.208'
    }
}

pipeline {
  agent { 
    docker { 
      image 'node:8.12' 
      args  '-u 0:0'
    } 
  }

  environment {
    SLACK_TOKEN = credentials('slack_token')
  }

  stages {
    stage("checkout") {
      steps {
        checkout scm
      }
    }

    stage("dependencies") {
      steps {
        sh 'npm install'
      }    
    }

    stage("do release") {
      steps {
      	sh 'npm run build'
      }
    }
    
    stage("upload build") {
      steps {
        script {
          GIT_BRANCH = sh (
                  script: 'git rev-parse --abbrev-ref HEAD',
                  returnStdout: true
                ).trim()
          withEnv(['DEPLOY_SERVER=' + getDeploymentServer(GIT_BRANCH), 'SERVE_DIR=/home/circle-of-angels', 'BUILDS_DIR=/home/builds/circle-of-angels']) {
            sshagent(credentials: ['ssh_jenkins_global'], ignoreMissing: true) {
              sh '''ssh -oStrictHostKeyChecking=no ${DEPLOY_SERVER} "
                        cp -aL ${SERVE_DIR} ${BUILDS_DIR}/$BUILD_NUMBER;
                        "
                '''
              sh '''rsync -av -e "ssh -oStrictHostKeyChecking=no" ${WORKSPACE}/* ${DEPLOY_SERVER}:${BUILDS_DIR}/$BUILD_NUMBER/'''


              sh '''ssh -oStrictHostKeyChecking=no ${DEPLOY_SERVER} "

                if [ -L ${SERVE_DIR} ]; then
                    rm ${SERVE_DIR};
                fi

                ln -s  ${BUILDS_DIR}/$BUILD_NUMBER ${SERVE_DIR} ;

                chown www-data -R ${SERVE_DIR}/;
                chmod 0755 -R ${SERVE_DIR}/;


                "
               '''
     
              sh '''ssh -oStrictHostKeyChecking=no ${DEPLOY_SERVER} "
    		   pm2 restart circle-of-angels-front
                   "
                 '''
            }
	  }
	}
      }
    }
    stage("Notify on slack") {
      steps {
        script {

          MSG = "New Backend deployed!"
          TO_POST = """
            {
              "text": "${MSG}",
              "icon_emoji": ":gentlemanparrot:",
              "channel": "CFN40LX55"
            }
          """
          httpRequest acceptType: 'APPLICATION_JSON', contentType: 'APPLICATION_JSON', httpMode: 'POST', requestBody: TO_POST, url: ('https://atixlabs.slack.com/services/hooks/incoming-webhook?token=' + SLACK_TOKEN)
        }

      }
    }
  }
}


