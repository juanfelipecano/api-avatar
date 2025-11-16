#!/usr/bin/env groovy

// Complete Jenkins Pipeline for NestJS API
// Purpose: Build, test, and containerize NestJS application

pipeline {
    agent any
    
    environment {
        // Build configuration
        IMAGE_NAME = 'avatar-api'
        BUILD_NUMBER = "${BUILD_NUMBER}"
        GIT_COMMIT = "${GIT_COMMIT}"
        GIT_BRANCH = "${GIT_BRANCH}"
        NODE_ENV = 'production'
    }
    
    parameters {
        choice(
            name: 'ACTION',
            choices: ['build', 'test-build', 'build-push'],
            description: 'What to do: build only, test + build, or build + push'
        )
        string(
            name: 'TAG',
            defaultValue: 'latest',
            description: 'Docker image tag (optional, defaults to latest)'
        )
        string(
            name: 'REGISTRY',
            defaultValue: '',
            description: 'Docker registry URL (optional, e.g., your-registry.com/project)'
        )
        booleanParam(
            name: 'SKIP_TESTS',
            defaultValue: false,
            description: 'Skip tests (NOT RECOMMENDED for production)'
        )
    }
    
    triggers {
        githubPush()
        pollSCM('H/15 * * * *')
    }
    
    stages {
        stage('Checkout Source') {
            steps {
                echo "📥 Checking out source code..."
                checkout scm
                echo "✅ Source code checked out"
            }
        }
        
        stage('Install Dependencies') {
            when {
                expression { params.ACTION == 'test-build' || params.ACTION == 'build-push' }
            }
            steps {
                echo "📦 Installing Node.js dependencies..."
                sh """
                    echo "🔧 Using Node.js version:"
                    node --version
                    npm --version
                    
                    echo "📦 Installing dependencies..."
                    npm ci
                    
                    echo "🔧 Generating Prisma client..."
                    npx prisma generate
                    
                    echo "✅ Dependencies installed successfully"
                """
            }
        }
        
        stage('Run Tests') {
            when {
                allOf {
                    expression { params.ACTION == 'test-build' || params.ACTION == 'build-push' }
                    expression { !params.SKIP_TESTS }
                }
            }
            steps {
                echo "🧪 Running tests..."
                sh """
                    echo "🧪 Running unit tests..."
                    npm run test
                    
                    echo "🧪 Running e2e tests..."
                    npm run test:e2e
                    
                    echo "✅ All tests passed"
                """
            }
            post {
                always {
                    publishTestResults testResultsPattern: 'test-results.xml'
                }
            }
        }
        
        stage('Build Application') {
            when {
                expression { params.ACTION == 'test-build' || params.ACTION == 'build-push' }
            }
            steps {
                echo "🔨 Building NestJS application..."
                sh """
                    echo "🔨 Compiling TypeScript..."
                    npm run build
                    
                    echo "🌱 Building seed data..."
                    npm run build:seed
                    
                    echo "✅ Application built successfully"
                """
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo "🐳 Building Docker image..."
                
                script {
                    def imageTag = params.TAG ?: 'latest'
                    def fullTag = "${IMAGE_NAME}:${imageTag}"
                    
                    sh """
                        echo "🏗️ Building Docker image: ${fullTag}"
                        echo "📋 Docker build context: $(pwd)"
                        echo "📄 Dockerfile contents:"
                        cat Dockerfile
                        
                        docker build -t ${fullTag} .
                        
                        if [ "${params.REGISTRY}" != "" ]; then
                            docker tag ${fullTag} ${params.REGISTRY}/${fullTag}
                            echo "✅ Tagged image for registry: ${params.REGISTRY}/${fullTag}"
                        fi
                        
                        echo "✅ Docker build completed"
                        docker images ${IMAGE_NAME}
                    """
                    
                    echo "📊 Build Information:"
                    echo "  - Image Name: ${env.IMAGE_NAME}"
                    echo "  - Tag: ${imageTag}"
                    echo "  - Build Number: ${env.BUILD_NUMBER}"
                    echo "  - Git Commit: ${env.GIT_COMMIT}"
                    echo "  - Git Branch: ${env.GIT_BRANCH}"
                    echo "  - Action: ${params.ACTION}"
                    echo "  - Skip Tests: ${params.SKIP_TESTS}"
                }
            }
        }
        
        stage('Push to Registry (Optional)') {
            when {
                expression { params.ACTION == 'build-push' && params.REGISTRY != '' }
            }
            steps {
                echo "📤 Pushing Docker image to registry..."
                
                script {
                    def imageTag = params.TAG ?: 'latest'
                    def registryTag = "${params.REGISTRY}/${IMAGE_NAME}:${imageTag}"
                    
                    sh """
                        echo "🚀 Pushing image: ${registryTag}"
                        docker push ${registryTag}
                        
                        # Also push latest tag if custom tag is used
                        if [ "${imageTag}" != "latest" ]; then
                            docker tag ${registryTag} ${params.REGISTRY}/${IMAGE_NAME}:latest
                            docker push ${params.REGISTRY}/${IMAGE_NAME}:latest
                            echo "✅ Also pushed latest tag"
                        fi
                        
                        echo "✅ Image pushed successfully"
                    """
                }
            }
        }
    }
    
    post {
        always {
            script {
                echo "📋 Build Summary"
                echo "  - Result: ${currentBuild.currentResult}"
                echo "  - Duration: ${currentBuild.duration / 1000}s"
                echo "  - Build Number: ${currentBuild.number}"
                echo "  - Git Commit: ${env.GIT_COMMIT}"
                echo "  - Git Branch: ${env.GIT_BRANCH}"
            }
        }
        
        success {
            echo "🎉 Build completed successfully!"
            
            script {
                if (params.REGISTRY != '') {
                    echo "✅ Docker image is ready: ${params.REGISTRY}/${IMAGE_NAME}:${params.TAG ?: 'latest'}"
                } else {
                    echo "✅ Docker image is ready locally: ${IMAGE_NAME}:${params.TAG ?: 'latest'}"
                    // Show the built images
                    sh 'docker images'
                }
            }
        }
        
        failure {
            echo "❌ Build failed - please check the logs"
            echo "🔍 Debugging info:"
            sh 'node --version'
            sh 'npm --version'
            sh 'docker --version'
            sh 'docker images'
        }
        
        unstable {
            echo "⚠️ Build completed with warnings (tests may have failed)"
        }
    }
}