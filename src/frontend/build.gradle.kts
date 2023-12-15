plugins{
    base
    id("com.github.node-gradle.node") version "3.5.0"
}

tasks.register("deps") {
	dependsOn("yarn_install")
	doFirst {
		println("Dependencies are now ready!")
	}
}

tasks {
	named("yarn_build") {
		dependsOn("yarn_install")
	}

	named("yarn_test") {
		dependsOn("yarn_install")
	}

	named("build") {
		dependsOn("deps")
		dependsOn("yarn_build")
	}
}
