pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/subashetha/devops-gitops-project.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Build Stage'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh '''
                        echo "Running SonarQube analysis..."
                        sonar-scanner \
                        -Dsonar.projectKey=devops-project \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=http://192.168.49.1:9000
                    '''
                }
            }
        }

        stage('Docker Build') {
            steps {
                echo "Docker build step"
                // sh 'docker build -t devops-app .'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo "Kubernetes deploy step"
                // sh 'kubectl apply -f kubernetes/'
            }
        }
    }
}
