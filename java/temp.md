### Map
	def map = [name: 'Gromit', likes: 'cheese', id: 1234];
	map.get('name') == 'Gromit';	//未取到值时返回null
	map['name'] == 'Gromit';
	map.name == 'Gromit';
	emptyMap.size() == 0;
	emptyMap.put("foo", 5);
	ages['Bob'] == null

	def map2 = map.clone();	//克隆map
	map.containsKey("name");	//包含，返回true,false

	map.each { entry ->		//遍历map
		println "Name: $entry.key Age: $entry.value"
	}
	map.each { key, value ->	//直接取key、value
		println "Name: $key Age: $value"
	}

	map1.putAll(map2);	//合并map

	def bob = people.find { it.value.name == 'Bob' };	//查找
	def females = people.findAll { it.value.gender == 'F' }
	def agesOfMales = people.findAll { id, person ->
		person.gender == 'M'
	}.collect { id, person ->
		person.age
	}

	people.every { id, person ->person.age > 18 };	//满足所有条件，返回true，false
	people.any { id, person ->person.age == 54 };

	//map分组
	assert [
			[name: 'Clark', city: 'London'], [name: 'Sharma', city: 'London'],
			[name: 'Maradona', city: 'LA'], [name: 'Zhang', city: 'HK'],
			[name: 'Ali', city: 'HK'], [name: 'Liu', city: 'HK'],
	].groupBy { it.city } == [
			London: [[name: 'Clark', city: 'London'],
					 [name: 'Sharma', city: 'London']],
			LA    : [[name: 'Maradona', city: 'LA']],
			HK    : [[name: 'Zhang', city: 'HK'],
					 [name: 'Ali', city: 'HK'],
					 [name: 'Liu', city: 'HK']],
	]
