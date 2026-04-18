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
                echo 'Build Stage Completed'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonarqube') {
                    sh """
                        sonar-scanner \
                        -Dsonar.projectKey=devops-app \
                        -Dsonar.projectName=DevOpsApp \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=-Dsonar.host.url=http://localhost:9000
                    """
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 3, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t devops-app .'
            }
        }

        stage('Docker Run (Optional Test)') {
            steps {
                sh '''
                    docker run -d -p 8081:8080 devops-app || echo "Container already running"
                '''
            }
        }

        stage('Ansible Deploy') {
            steps {
                sh '''
                    ansible-playbook -i ansible/inventory/hosts ansible/playbooks/docker_setup.yml || echo "Ansible skipped"
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                    kubectl apply -f kubernetes/ || echo "kubectl not configured"
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully'
        }

        failure {
            echo 'Pipeline failed — check logs'
        }
    }
}


