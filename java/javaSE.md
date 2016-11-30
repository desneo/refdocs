# Java试题
    1) Double xx = (double)(7 / 4);	//xx=1.0
    2) int intzero = 0;
       char charzero = '0';
       System.out.println(intzero + charzero);	//48

# Java集合
## 使用方法
    //1)容器.iterator() 要求容器返回一个Iterator。单向，无关类型
    //2)next() 下一个元素; hasNext(); it.remove() 将返回的元素删除
    Collections.min(Collection)		//最小值
    Collections.max(Collection, Comparator);	//自定义比较方法


## 集合转换
    Set-->List：ArrayList<BigDecimal> tempArrayList = new ArrayList<>(ss);  
    List-->Set: Set<String> listSet = new HashSet<String>(list);  
    Set-->Array: set.toArray(arr);  
    Array-->Set: Set<String> set = new HashSet<String>(Arrays.asList(arr));  
    List-->Array: list.toArray();  
    Array-->List: Arrays.asList(array);  
    Map-->Set: Set<String> mapValuesSet = new HashSet<String>(map.values()); 
    Map-->List: List<String> mapKeyList = new ArrayList<String>(map.keySet());
    String-->Array: char[] chars= xx.toCharArray();
    Array-->String: new String(chars)

## List
### 过滤list
    //1--
    Iterator<Foo> it = col.iterator();
    while( it.hasNext() ) {
      Foo foo = it.next();
      if( !condition(foo) ) it.remove();
    }
    //2--java8-steam
    List<Person> olderThan30 = personList.stream().filter(p -> p.age >= 30).collect(Collectors.toList());
    //3--Use CollectionUtils.filter(Collection,Predicate), from Apache Commons.

### List排序
    //默认逆排序，List内的Object都必须实现了Comparable接口，否则报错
    Collections.sort(arrayList );
    Collections.reverse(arrayList );

    //自定义排序
    //1) 临时声明一个Comparator来实现排序， 	public int compare(Object a, Object b){} 返回值大于0则a在后
    ////对输出结果进行排序，最新的在最前面--20140613增加，周绍华
    List<TaskHead> list = new ArrayList<TaskHead>();
    //按离160最近距离排序
    Integer[] zz = {100, 150, 200, 0};
    List<Integer> xx = Arrays.asList(zz);
    System.out.println(xx);
    Collections.sort(xx, new Comparator<Integer>()
    {
        public int compare(Integer o1, Integer o2)
        {
            return Math.abs(o1 - 160) - Math.abs(o2 - 160);
        }
    });
    System.out.println(xx);

    //2)自定义class实现Comparable接口
    class Employee implements Comparable<Employee>
    {
        private int id;
        //返回值>0,则this被排在后面,arg0放前面; <0则this在前面。
        public int compareTo(Employee other)
        {
            if (id < other.id)
                return -1;
            if (id > other.id)
                return 1;
            return 0;
        }
    }

### ArrayList 常用，查询快，增删慢，非线程安全（底层数组）
    //内部Object[]实现
    1) 容量不足时每次扩容1/2，会触发一次数组复制动作
### LinkedList 查询慢，增删快，非线程安全（底层链表）
    //可当作堆栈、队列和双向队列使用， addFirst() 、getLast() 、 removeFirst()
    //链表实现，Node<E>
    Node(Node<E> prev, E element, Node<E> next) {
        this.item = element;
        this.next = next;
        this.prev = prev;
    }
### Vector 线程安全，效率低（实现同ArrayList,底层数组,方法加synchronized）


## MAp
    1)负载因子--空表是0，半满状是0.5，默认0.75，每次扩容容量加倍
### 遍历map
    1) for (Map.Entry<Integer, Integer> entry : map.entrySet()) {}
    2) for (Integer key : map.keySet()) { }
    3) Iterator<Map.Entry<Integer, Integer>> entries = map.entrySet().iterator();
       while (entries.hasNext()) {
          Map.Entry<Integer, Integer> entry = entries.next();
       }

### HashMap 常用，可null
    HashMap<String , Double> map = new HashMap<>();
    map.put("语文" , 80.0);
### HashTable 线程安全,继承Dictionary,key/value不可为null
### LinkedHashMap按插入顺序
    遍历次序按照插入顺序进行，比HashMap慢一点，但迭代访问更快，因其内部是使用数组实现。
### TreeMap 可自定义排序
    基于红黑树的实现，次序由Comparator决定。详见List中自定义顺序例子
### Properties *.properties文件
    Properties prop = new Properties();
    FileInputStream fis = new FileInputStream("prop.properties");
    prop.load(fis);

## Set
    定义equals()方法（int、string已自带）以确保对象唯一性。无序。
### HashSet 常用，可null
    //1) 源码中使用HashMap实现（只使用Key部分功能）
    HashSet<BigDecimal> ss = new HashSet<>();
    ss.add(new BigDecimal(123));
### LinkedHashSet 按插入顺序迭代
    1)兼具速度与顺序，节点上维护着双重列表，即可知道插入顺序  
    2)元素必须定义hashCode()方法来确保唯一性(或默认)
### TreeSet 按指定方式排序
    1)按插入顺序保存，将元素存储在红-黑树数据结构中。
    2)自定义排序方式，实现Comparable接口，详见见List中排序

## Queue队列
    PriorityQueue-优先队列-【可】自定义优先级,实现Comparator接口来改变优先级。当调用peek()、poll和remove()方法时，获取的将是队列中优先级最高的元素！(详见list自定义排序)

## Stack栈

# Java多线程
## synchronized同步锁

##concurrent--并发工具包
    //以下类都线程安全
    ConcurrentHashMap 
    LinkedBlockingQueue --线程安全的阻塞(继承BlockingQueue)队列，可以指定容量，也可以不指定，不指定则默认值最大Integer.MAX_VALUE，其中主要用到put和take方法 ，put方法在队列满的时候会阻塞直到有队列成员被消费，take方法在队列空的时候会阻塞，直到有队列成员被放进来。
    ConcurrentLinkedQueue -- 非阻塞队列，当queue为空时不阻塞，而是返回null，需要程序自己进行处理

## Excutor-线程池，启动线程的优选方法
    定义任务类class--实现Runnable接口的run方法
    newCatchedThreadPool-少用
    //线程复用，CatchedThreadPool将为每个任务都创建一个线程。然后在它回收旧线程时停止创建新线程
    //使用静态的Excutor方法创建！ 当前的main线程继续运行，在Executor中的所有任务完成之后尽快退出。
    ExecutorService exec = Executors.newCachedThreadPool();
    for(int i=0; i<3; i++){
    	exec.execute(new LiftOff());
    }
    //shutdown()方法的调用可以防止新任务被提交给Executor。
    exec.shutdown();

### newFixedThreadPool-常用-数量固定，线程复用
    //线程复用，newFixedThreadPool预先一次性执行线程分配，使用有限的线程集来执行所提交的任务-线程池。
    //预先一次性执行代价高昂的线程分配，而不必为每个任务都固定的创建线程，节省时间。
    //可看出每次同时执行的只有两个线程
    ExecutorService exec = Executors.newFixedThreadPool(2);
    for(int i=0; i<4; i++){
    	exec.execute(new LiftOff());
    }
    exec.shutdown();

### newSingleThreadPool-数量1的newFixedThreadPool
    如果向newSingleThreadPool提交了多个任务，那么这些任务将排队，每个任务都会在下一个任务开始之前结束。
    使用场景，如多个线程都需要使用文件系统，可免去同步的操作。

## 分支/合并(Fork/Join)框架
    //原理
    使用“分而治之”算法。其思路是将算法要处理的数据空间拆成较小的独立块，这是“映射”阶段。一旦块集处理完毕之后，就可以将部分结果收集起来形成最终结果，这是“归约”阶段。
    一个例子：计算一个大型整数数组的总和。可以将数组划分为较小的部分，并发线程对这些部分计算部分和。然后部分相加，计算总和。此算法在多核架构上可看到明显的性能提升。
    //描述
    1.fork()	允许执行计划ForkJoinTask一步执行。这允许从现有的ForkJoinTask启动新的ForkJoinTask。
    2.join()	允许ForkJoinTask等待另一个ForkJoinTask完成。
    RecursiveAction	表示不产生返回值的执行。
    RecursiveTask	常用，产生返回值。

# Java I/O（SE7）
## Path 位置/路径
    注：1）Path可独立存在，只有在读取或写入时才会异常
        2) 去掉./..-->path.normalize() ,快捷方式的真实地址:path.toRealPath()
    Path listing = Paths.get("C:/Users/z00316474/Desktop");
## 处理目录和目录树
### 目录中查找文件
    try (DirectoryStream<Path> stream = Files.newDirectoryStream(path,"*.doc"))
    {
    	for (Path path : stream)
    	{
    		System.out.println(path.getFileName());
    	}
    }
### 遍历目录树-重写visitFile即可
    public static void main(String[] args) throws IOException
    {
        Path path = Paths.get("F:/project/C10/20160704-");
        Files.walkFileTree(path, new findPropertyVisitor());
    }
    private static class findPropertyVisitor extends SimpleFileVisitor<Path>{
        @Override
        public FileVisitResult visitFile(Path file, BasicFileAttributes attributes){
            if(file.toString().endsWith(".properties")){
                System.out.println(file.getFileName());
            }
            return FileVisitResult.CONTINUE;
        }
    }

## Files 操作文件
    Files.createFile(path);
    Files.delete(path);
    Files.copy(source, target [, REPLACE_EXISTING]);    //可设置属性，如覆盖已有文件
    Files.move(source, target);
    Files.exist(path);  //是否存在
    Files.readAttributes(path, "*") //文件属性

### 读文件
    //java7:
    List<String> lines = Files.readAllLines(path, StandardCharsets.UTF_8);
    byte[] bytes = Files.readAllBytes(path);  

    //java8 流式打开，内存占用小
    Files.lines(path, StandardCharsets.UTF_8).forEach((line) -> {
        System.out.println(line);
    });	

    //java6--从jar包中读配置文件
    //getResourceAsStream入参中如果开头'/',则从classPath根目录(也即jar包根目录)找起；否则以*.class文件所在的目录往下匹配文件
    //Class.getClassLoader().getResource(String path)		//path不能以’/'开头时；path是从ClassPath根下获取；
    //文件绝对路径(但不可直接读取)：
    String xx = TestClass.class.getResource("/config/activejs/xx.js").getPath();
    InputStream in = TestClass.class.getResourceAsStream("/config/activejs/xx.js");
    BufferedReader br=new BufferedReader(new InputStreamReader(in));
    String s="";
    while(true) {
    	String xx = br.readLine();
    	if( null == xx){
    		break;
    	}
    	s += (xx+"\n");
    }
    System.out.println(s);

### 写文件
    try(BufferedWriter writer = Files.newBufferedWriter(path, StandardCharsets.UTF_8, StandardOpenOption.WRITE)){
        writer.write("Hello World!");
    }

### 文件寻址定位
    //读取文件最后的100个字符
    ByteBuffer buffer = ByteBuffer.allocate(100);
    FileChannel channel = FileChannel.open(path, StandardOpenOption.READ);
    channel.read(buffer, channel.size()-100);

## 异步I/O
### 回调式
    //读取文件最后的100个字符
    ByteBuffer buffer = ByteBuffer.allocate(1000);
    //异步方式打开文件
    AsynchronousFileChannel channel = AsynchronousFileChannel.open(path);
    //读文件
    channel.read(buffer, 0, buffer,
            new CompletionHandler<Integer, ByteBuffer>()
            {

                @Override
                //读取完成时回调方法
                public void completed(Integer paramV, ByteBuffer paramA)
                {
                }

                @Override
                public void failed(Throwable paramThrowable,
                        ByteBuffer paramA)
                {
                }
            });

## try-with-resource 资源自动关闭,实现了Closeable接口的类    
    注：1）try后面()中打开的资源会在{}代码执行完成/异常后自动关闭  
        2) 可结合catch、finally使用，在资源关闭后执行
    try (
      java.util.zip.ZipFile zf = new java.util.zip.ZipFile(zipFileName);
      java.io.BufferedWriter writer = java.nio.file.Files.newBufferedWriter(outputFilePath, charset)
    ) {}

## 文件修改通知 WatchService

## 读取网络文件

# Java时间
    Date	日期
    SimpleDateFormat	日期格式
    GreogrianCalendar	日历
    TimeUnit.SECONDS.sleep(10);	/封装，增加可读性
    Thread.sleep(10);	//毫秒数

## 时区
    //GMT,自1970.1.1 00:00:00开始的毫秒数
    System.currentTimeMillis();
    //获取当前的时区(jvm默认使用操作系统时区)
    System.out.println(TimeZone.getDefault());
    System.out.println(new Date());
    //设置项目时区
    TimeZone.setDefault(TimeZone.getTimeZone("GMT"));
    System.out.println(TimeZone.getDefault());
    //所有Date都是GMT时间，在格式化输出时会根据当前时区进行增减
    System.out.println(new Date());
    System.out.println(new Date(System.currentTimeMillis() + 28800000));
## 时间<-->字符串
    //时间转字符串
    SimpleDateFormat dateFormat = new SimpleDateFormat(
            "yyyy-MM-dd HH:mm:ss");
    String dateTime = dateFormat.format(new Date());
    System.out.println(new Date());
    System.out.println(new Date().getTime());

    //字符串转时间，减去当前时区，再转GMT
    String dateStr = dateTime;
    //dateFormat.setTimeZone(TimeZone.getTimeZone("GMT"));
    Date dateTmp = dateFormat.parse(dateStr);
    System.out.println(dateTmp);
    System.out.println(dateTmp.getTime());

## String/Date<-->TimeStamp
    //1) TimeStamp在util.Date上增加了毫微秒的时间访问控制，getNanos（）， 格式 2016-07-28 12:51:56.919
    //2) 是为了与数据库中的Timestamp数据类型进行匹配
    System.out.println(new Timestamp(new Date().getTime()));	//Date-->TimeStamp
    System.out.println(new Date(new Timestamp(System.currentTimeMillis()).getTime()));	//TimeStamp-->date
    //string --> TimeStamp, 先转成Date

## Calendar日历
    //计算一年中的第几个星期是几号
    SimpleDateFormat df=new SimpleDateFormat("yyyy-MM-dd"); 
    Calendar cal=Calendar.getInstance(); 
    cal.set(Calendar.YEAR, 2006); 
    cal.set(Calendar.WEEK_OF_YEAR, 1); 
    cal.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY); 
    System.out.println(df.format(cal.getTime()));

# Java字符串
## StringBuilder和StringBuffer
    一般在单线程的系统环境下优先使用StringBuilder，因为它是非线程安全的。
    而在多线程的环境下，比如Web系统，优先使用StringBuffer，因为它当中绝大部分方法都使用了synchronized进行修饰，保证了多线程环境下的线程安全问题。

#  enum枚举类型
    Color xx = Color.RED;
    switch (xx)
    {
        case RED:
            System.out.println(xx.getValue());
            break;
        default:
            break;
    }
    public class EnumTest
    {
        public static enum Color
        {
           //enum可给定值
            RED("AA"), YELLOW("ff");
            private String name;
            private Color(String namein)
            {
                this.name = namein;
            }
            public String getValue()
            {
                return name;
            }
        }
    }

# Lambdas-匿名函数
## [示例](http://blog.csdn.net/ioriogami/article/details/12782141)
    //三部分组成：参数列表，箭头（->），以及一个表达式或语句块。
    public int add(int x, int y) { return x + y; }	//转换如下
    (int x, int y) -> x + y;	
    或 (x, y) -> x + y; //返回两数之和,java编译器自动根据上下文判断
    或 (x, y) -> { return x + y; } //显式指明返回值
    c -> { return c.size(); }	//只有一个参数自动推导

## lambdas的用处
    //自动将入参匹配到一个函数(按入参个数)，达到同等功能, 典型应用的替换Runnable / Comparator
    Collections.sort(list, (o1, o2) -> {
        return Math.abs(o1 - 160) - Math.abs(o2 - 160);
    });
    //forEach循环
    list.forEach((t) -> {
        System.out.println(t);
    });

## 两个冒号**
    //如 objCollection.forEach(someInfrastructure::output);简单来讲，就是构造一个该方法的闭包。比如：
    Math::max //等效于(a, b)->Math.max(a, b)
    String::startWith  //等效于(s1, s2)->s1.startWith(s2)
    s::isEmpty //等效于()->s.isEmpty()


# Java反射
    1) Hibernate中，将select返回的结果封装成对象返回
    2）

# Java异常
    //java7
    try {     
    } catch (FileNotFoundException | ParseException | ConfigurationException e) {
    	System.err.println("Config file '" + fileName + "' is missing or malformed");   
    } catch (IOException iox) {     
    	System.err.println("Error while processing file '" + fileName + "'");   
    	throw e;	//抛出异常
    	throw new NullpointException();
    } 

## 自定义异常
    //最重要的是异常名字
    class SimpleException extends Exception{}

# Java关键字
## extends和implements
    extends继承普通class或abstract(抽象)类（java单继承）
    implements多继承能力，实现interface(接口)。 注： abstract implements interface  

## interface
    1)实现多重继承, public interface Tinterface 
    2)方法都是public(可不写，默认)，只需定义返回值和名字，不能有实现
    3)属性默认是public static final(可不写，默认)

## abstract
    1)修饰class，可无抽象方法。public abstract class AbstractList<E>
    2)修饰方法，public abstract void sleep(); //子类中必须实现

## final
    1)属性/func参数--值不可改变
      a)final int i=100 , i值不能改变
      b)final File f=new File("c:\\test.txt"); //f不能重新赋值，但f.xx可以
    2)方法--子类不得覆盖重写该方法，确保在继承中使方法行为保持不变
    3)class--表明不打算继承该类，而且也不允许别人继承。 fianl class Art {}

## static
    不需new对象即可调用到 静态方法/变量
    1)static方法-->  public static void print()
    2)static变量--> 静态变量为所有对象共享，内存中只一个副本，当且仅当类第一次加载时被初始化一次
    3)static代码块--> 可任何位置，形成静态代码块优化性能，类初次加载时会按照顺序执行static代码块，且只执行一次
     private static Date startDate,endDate;
     static{
        startDate = Date.valueOf("1946");
        endDate = Date.valueOf("1964");
     }

## this/super
    1)this 指当前对象自己 (可用于返回对象自己)  
    2)super指代父类。a)super() 调用父类中的初始化方法  b)super.ss()	 调用父类中方法/属性

## instanceOf**
    1) p instanceof Student


## 泛型
    1)泛型必须是对象，不能是简单类型(int float)
    2)类型参数可以多个，<T extends SomeClass & interface1 & interface2 & interface3>  //仍保持单继承的规则
    3)限制类型，可使用extends， 如<T extends superclass>
    4)通配符？表示未知类型， 处理定义List<Object>， 但是传入list<String>时编译报错的情况（因类型擦除）。
    5)类型擦除：使用泛型的时候加上的类型参数，会被编译器在编译的时候去掉。这个过程就称为类型擦除。类型擦除的过程，首先是找到用来替换类型参数的具体类。这个具体类一般是Object。如果指定了类型参数的上界的话，则使用这个上界。把代码中的类型参数都替换成具体的类。同时去掉出现的类型声明，即去掉<>的内容。比如: T get()方法声明就变成了Object get()； List<String>就变成了List。 接下来就可能需要生成一些桥接方法（bridge method）。这是由于擦除了类型之后的类可能缺少某些必须的方法
    //示例1
    public class ObjectFoo<T>
    {
        private T x;
    	public ObjectFoo(T x)
        {
            this.x = x;
        }
    	public T getX()
        {
            return x;
        }
    	public void setX(T x)
        {
            this.x = x;
        }
    }
    ObjectFoo<Integer> in = new ObjectFoo<Integer>(123); System.out.println(in.getX());
    ObjectFoo<String> str = new ObjectFoo<String>("asdasd"); System.out.println(str.getX());

    //示例2
    public void inspect(List<Object> list)
    {
    	for (Object obj : list)
    	{
    		System.out.println(obj);
    	}
    	list.add(1); //这个操作在当前方法的上下文是合法的。 
    }
    public void test()
    {
    	List<String> strs = new ArrayList<String>();
    	inspect(strs); //编译错误, 如果不报错的话会导致往list<String>中添加了一个int 
    }

## synchronized同步锁
    1)所有对象自动含有单一的锁，当在对上调用其任一synchronized时，对象都被锁住。  
    2)当任务要执行被synchronized关键字保护的代码片段的时候，它将首先检查锁是否可用，然后获取锁，执行代码，释放锁。  
    3)对象里所有的synchronized方法共享一把锁  
    4)在并发时，将域设置成private很重要，否则synchronized关键字就不能防止其他任务直接访问域  
    5)用于static方法时，所有对象共享同一把锁  
    //用于代码块--优先
    public void println(String x) {
        synchronized (this) {
            print(x);
            newLine();
        }
    //用于方法
    public synchronized boolean add(E e) {}

## finally
    try{}catch(){} finally{//此处代码总会执行}

## transient
    0)变量将不被序列化，即反序列化后无值。(transient Object[] elementData)。transient只可修饰对象属性(不能func/class/局部变量)
    1)serilization--序列化，将对象转成字节(供存储或网络发送)。deserilization-反序列化，将字节重建成对象。(类似js的stringfy和parseJson,两个独立的对象)
    2)将需要序列化的类实现Serializable接口就可以

## threadLocal
    1、用于线程集的全局变量(当前线程共享)，  private static ThreadLocal<Integer> seqNum = new ThreadLocal<Integer>() 
        seqNum.set(1); seqNum.get(); 
    2、单的static是所有线程共享的全局变量

# Stream java8
    //1) Stream对集合功能的增强。类似Iterator，可顺序/并行对原Stream进行过滤汇总 ，数据源可无限。
    //3) 创建Stream(Collection已实现接口)-->转换Stream，不影响源,返回新的Stream对象，可多次-->对Stream进行操作，得到想要的结果
    //4) Steam操作（Intermediate型，后可多个）: 
          map (mapToInt, flatMap 等)、 filter、 distinct、 sorted、 peek、 limit、 skip、 parallel、 sequential、 unordered
          limit--取前多少个; skip--扔掉前n个
    //5) Steam操作(Terminal型，只能一个，流的最后操作，会启动流的遍历)
          forEach、 forEachOrdered、 toArray、 reduce、 collect、 min、 max、 count、 anyMatch、 allMatch、 noneMatch、 findFirst、 findAny、 iterator
          sorted--排序，与数组排序优势在于可先进行，filter/distinct等操作后再排序，减少数量，缩短执行时间
    //6）list.parallelStream() ,创建并行的stream
    //70 stream转成其他结构： 
      stream.collect(Collectors.toList());  
      Set set1 = stream.collect(Collectors.toSet());
    list.stream().filter(num->{return num>0;}).collect(Collectors.toList());   //过滤list中大于0值，转成list返回(lambda返回true/false)
    list.stream().distinct().count()  //distinct, 去重，需重写equals(和hashCode)方法 ， 统计个数
    List<String> output = wordList.stream().map(String::toUpperCase).collect(Collectors.toList()); //map/faltmap,所有单词转大写，一一映射

# Java其它
## java配置
    1)安装，jdk和jre需安装到不同目录（F:\program\java8\jdk1.8.0_102\） //java -version有值则安装成功
    2)环境变量-->系统变量-->新建JAVA_HOME，值F:\program\java8\jdk1.8.0_102(jdk的安装路径)	//windows环境变量key不区分大小写
    	  -->系统变量-->Path中添加 %JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;
    	  -->系统变量-->CLASSPATH（无则新建）中添加 .;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar;
    	  -->若成功，则javac有输出值
    3) 注：若javac还是无法执行，检查bin目录下是否有javac.exe,否则重装

## java查看源码
    手动: 下载*.tar.gz的jdk包--src.zip(源码，*.exe中可能无此文件)-->欲附加源码的jar，右键，properties-->External File.. ,src.zip  
    IDE自动下载(maven): window-->preference-->maven-->勾选，download  sources / javaDoc  

## 重写equals方法
    //同时必须重写hashCode方法，以维护相等的对象具有相等的hash码（不重写无效）
    @Override
    public boolean equals(Object obj)
    {
        if (this == obj)
        {
            return true;
        }
        Student xx = (Student)obj; //类型转换
        return this.firstName.equals(xx.firstName);
    }
    @Override
    public int hashCode()
    {
        return this.getFirstName().hashCode();
    }


## Java字符编码
    1)java程序内部字符集使用unicode表示的（2字节），但unicode只定义了表示，没有定义存储字符时的表示方法。
    2)内置部分字符集： StandardCharsets.UTF_8
    3)只有当从外部引入byte[]或向外部输出byte[]时才需要指定编码。如socket、file操作等！  
    //编码转换,字符省略时默认'utf-8'
    String ss = "周123"; 
    System.out.println(new String(ss.getBytes("UTF-8"), StandardCharsets.UTF_8));
    //当前运行时的字符集
    Charset.defaultCharset().displayName();
    //是否支持字符集  
    Charset.isSupported("gbk");
    //当前支持的所有字符集
    Set<String> charsetNames = Charset.availableCharsets().keySet();

# java反射
## 描述
        java.lang.Class   java.lang.reflect
        Java反射指可以运行时加载、探知、使用编译期间完全未知的classes，即java程序可以加载一个
    运行时才知名称的clas是，获悉其完整构造，并生成其对象实体、对field设值、或调用其methods。
        主要功能： 在运行时判断任意一个对象所属的类；在运行时构造任意一个类的对象；在运行时判
    断任意一个类所具有的成员变量和方法；在运行时调用任意一个对象的方法；生成动态代理。

## Class
    //获取class
    1) Class c1 = Class.forName ("java.lang.String");      //常用
    2) String str = "abc"; Class c1 = str.getClass();

    //方法, 几乎可以还原一个class的原貌，除了class引用的其它classes(需要记录下所有入参和返回值的类型，加以剔除)
    Method[] methods = c1.getMethods();
    System.out.println(method.getName());
    System.out.println(method.getGenericParameterTypes().length);
    System.out.println(method.getGenericReturnType());

### 运行时生成instance
    1、 无入参的构造函数
        Class c = Class.forName("DynTest");
        obj = c.newInstance();
    2、带入参的构造函数 (先获得指定的constructor)
        Class c = Class.forName("DynTest");
        Class[] pTypes = new Class[] { double.class, int.class };
        Constructor ctor = c.getConstructor(pTypes);    //指定的构造函数
        Object[] arg = new Object[] {3.14159, 125}; //自变量
        Object obj = ctor.newInstance(arg);

### 运行时调用methods
        //先获取方法，组装入参，再实例，调用
        public String func(String s, Hashtable ht)
        {
        …System.out.println("func invoked"); return s;
        }
        public static void main(String args[])
        {
        Class c = Class.forName("Test");
        Class ptypes[] = new Class[2];
        ptypes[0] = Class.forName("java.lang.String");
        ptypes[1] = Class.forName("java.util.Hashtable");
        Method m = c.getMethod("func",ptypes);
        Test obj = new Test();
        Object args[] = new Object[2];
        arg[0] = new String("Hello,world");
        arg[1] = null;
        Object r = m.invoke(obj, arg);
        Integer rval = (String)r;
        System.out.println(rval);
        }

### 运行时变更fields内容
        //先获取field,再示例，再修改
        public class Test {
        public double d;
        public static void main(String args[])
        {
            Class c = Class.forName("Test");
            Field f = c.getField("d"); //指定field 名称
            Test obj = new Test();
            System.out.println("d= " + (Double)f.get(obj));
            f.set(obj, 12.34);
            System.out.println("d= " + obj.d);
        }
        }    


# Java代理
## JDK动态代理--依赖接口,效率低，素有方法都要调用invoke
    1) 实现InvocationHandler 接口创建自己的调用处理器； --> 为 Proxy 类指定 ClassLoader 对象和一组 interface 来创建动态代理类 
        -->通过反射机制获得动态代理类的构造函数，其唯一参数类型是调用处理器接口类型；
        -->通过构造函数创建动态代理类实例，构造时调用处理器对象作为参数被传入
    3) 参考地址  https://www.zhihu.com/question/20794107/answer/2333038
    package test;
    public interface Subject   
    {   
      public void doSomething();   
    }

    package test;
    public class RealSubject implements Subject   
    {   
      public void doSomething()   
      {   
        System.out.println( "call doSomething()" );   
      }   
    }  

    package test;
    import java.lang.reflect.InvocationHandler;  
    import java.lang.reflect.Method;  
    import java.lang.reflect.Proxy;  

    public class ProxyHandler implements InvocationHandler
    {
        private Object tar;
        //绑定委托对象，并返回代理类
        public Object bind(Object tar)
        {
            this.tar = tar;
            //绑定该类实现的所有接口，取得代理类 
            return Proxy.newProxyInstance(tar.getClass().getClassLoader(),
                                          tar.getClass().getInterfaces(),
                                          this);
        }    
        public Object invoke(Object proxy , Method method , Object[] args)throws Throwable
        {
            Object result = null;
            //这里就可以进行所谓的AOP编程了
            //这里就可以进行所谓的AOP编程了
            //在调用具体函数方法前，执行功能处理
            result = method.invoke(tar,args);
            //在调用具体函数方法后，执行功能处理
            return result;
        }
    }

    public class TestProxy
    {
        public static void main(String args[])
        {
               ProxyHandler proxy = new ProxyHandler();
               //绑定该类实现的所有接口
               Subject sub = (Subject) proxy.bind(new RealSubject());
               sub.doSomething();
        }
    }

## cglib--修改class文件

# Java动态编译
    1) 运行期直接编译.java 文件，执行.class，并且能够获得相关的输入输出
    public class Client {
        public static void main(String[] args) throws Exception {
            //Java 源代码
            Stri ng sourceStr = "public class Hello{public String sayHello (String name)
                {return \"Hello,\" + name + \"!\";}}";
            // 类名及文件名
            String clsName = "Hello";
            // 方法名
            String methodName = "sayHello";
            // 当前编译器
            JavaCompiler cmp = ToolProvider.getSystemJavaCompiler();
            //Java 标准文件管理器
            StandardJavaFileManager fm = cmp.getStandardFileManager(null,null,null);
            //Java 文件对象
            JavaFileObject jfo = new StringJavaObject(clsName,sourceStr);
            // 编译参数，类似于javac <options> 中的options
            List<String> optionsList = new ArrayList<String>();
            // 编译文件的存放地方，注意：此处是为Eclipse 工具特设的
            optionsList.addAll(Arrays.asList("-d","./bin"));
            // 要编译的单元
            List<JavaFileObject> jfos = Arrays.asList(jfo);
            // 设置编译环境
            Java Compiler.CompilationTask task = cmp.getTask(null, fm, null,optionsList,null,jfos);
            // 编译成功
            if(task.call()){
                // 生成对象
                Object obj = Class.forName(clsName).newInstance();
                Class<? extends Object> cls = obj.getClass();
                // 调用sayHello 方法
                Method m = cls.getMethod(methodName, String.class);
                String str = (String) m.invoke(obj, "Dynamic Compilation");
                System.out.println(str);
            }
        }

# Java类加载器 ClassLoder
        虚拟机载入java类：ClassLoader读取.class文件，转换成kava.lang.class的一个实例，
    然后通过newInstance创建该类的一个对象。
        http://www.ibm.com/developerworks/cn/java/j-lo-hotswapcls/
## 层次结构
    //启动顺序 从上往下
    BootStrapClassLoader  核心库,sun.boot.class.path下类加载，或jre/lib下核心API，或Xbootclasspath指定的jar包。
            /\
        ExtClassLoader     加载JRE的扩展目录(JAVA_HOME/jre/lib/ext或java.ext.dirs属性指定的目录)jar的类包。
            /\
        AppClassLoader  最常用，加载classpath下jar包，默认为环境变量CLASSPATH中设定的值。也可通过-classpath指定。
            /\
        CustomClassLoader 自定义类加载过程，进行指定类的运行时动态加载
        java有3个初始类加载器，当虚拟机启动时，他们会按照以下顺序启动: Bootstrap classloader(parent)

    //示例1
    URL[] urls=sun.misc.Launcher.getBootstrapClassPath().getURLs();
        System.out.println(urls[i].toExternalForm());

## java类加载过程
        1、在进行类加载时，首先会从自己向上挨个检查是否已经加载了指定类，如果已经加载则直接返回该类的引用。
    如果到最高层也没有加载过指定类，那么会自顶向下挨个尝试加载，直到用户自定义类加载器，如果还不能成
    功，就会抛出异常（也称委托机制）。
        2、每个类加载器都有自己的名字空间(ClassLoader的classes字段)，对于同一个类加载器实例来说，名字相同的
    类只能存在一个，并且仅加载一次。不管有无变化，下次再需要加载时，它只是从自己的缓存中直接返回已加载过的类引用。
        3、要想实现同一个类的不同版本的共存，我们必须要通过不同的类加载器来加载该类的不同版本。
        4、全盘负责机制：若类A调用了类Ｂ，则类B和类B所引入的所有jar包，都由类A的类加载器统一加载。

## 自定义ClassLoader
### 方案1 重写 findClass,jdk推荐
        Java加载类的过程，实质上是调用loadClass()方法，loadClass中调用findLoadedClass()方
    法来检查该类是否已经被加载过，如果没有就会调用父加载器的loadClass()，如果父加载器
    无法加载该类，就调用findClass()来查找该类。
        所以我们要做的就是新建MyClassLoader继承java.lang.ClassLoader，重写其中的findClass()方法。
    主要是重新设计查找字节码文件的方案，然后调用definedClass来返回。
### 方案2 重写loadClass
        findLoadedClass：每个类加载器都维护有自己的一份已加载类名字空间，其中不能出现两个同名的类。凡是通过该类加载
    器加载的类，无论是直接的还是间接的，都保存在自己的名字空间中，该方法就是在该名字空间中寻找指定的类是否已存在，如
    果存在就返回给类的引用，否则就返回null。这里的直接是指，存在于该类加载器的加载路径上并由该加载器完成加载，间接是
    指，由该类加载器把类的加载工作委托给其他类加载器完成类的实际加载。
        getSystemClassLoader：Java2 中新增的方法。该方法返回系统使用的 ClassLoader。可以在自己定制的类加载器中通过该
    方法把一部分工作转交给系统类加载器去处理。
        defineClass：该方法是 ClassLoader中非常重要的一个方法，它接收以字节数组表示的类字节码，并把它转换成Class实例
    ，该方法转换一个类的同时，会先要求装载该类的父类以及实现的接口类。
    loadClass：加载类的入口方法，调用该方法完成类的显式加载。通过对该方法的重新实现，我们可以完全控制和管理类的加载过程。
    resolveClass：链接一个指定的类。这是一个在某些情况下确保类可用的必要方法，详见 Java 语言规范中“执行”一章对该方法的描述。

##  热加载
    需要升级时取实例化一个新的类加载器.


## 访问控制
    00 -- Java的访问控制是停留在编译层的，也就是它不会在.class文件中留下任何的痕迹，只在编译的时候进
        行访问控制的检查。其实，通过反射的手段，是可以访问任何包下任何类中的成员,如私有成员。
    01-private  只对象内部能调用到，如构建方法（实例化）定义为private,则不能通过new 构造方法产生对象。


# Groovy
## 基础  
	== 相当于java中的equals
	
	println xx?.yy;  //安全引用操作符, 如果xx==null， 则后面不执行  
	
	//字符串求值， 或${x}
	def x = 1;
	def doubleQuoteWithDollar = "I am $x dolloar" //输出I am 1 dolloar
	
	//定义变量
	xx = "asdasd"  //全局变量
	def str= "i am a person"  //类型不定
	String str = "12312"    //若指定类型，则变量类型不可修改
	
	//对象
	def xx= {}; xx.name="asdasd"
	
	//定义函数
	def  nonReturnTypeFunc(){  //函数返回值类型可指定类型，如String，如果不return string则报错
	     [return] last_line;   //return可选， 最后一行代码的执行结果就是本函数的返回值
	}

## 容器操作
### List
	def list = [5, 6, 7, 8];
	list[2] == 7	
	list[-2]==6		//从尾部往前取
	list.size()==4	//长度
	list.add(5)		//添加
	list[2]=100		//指定位置添加
	def list=[];	//追加元素
	list << 7 << "i" << 11
	assert list == [7, "i", 11]
	['a',2,'c',4].clear()==[]	//清空数组

	['a','b','c','b','b'] - 'b' == ['a','c']	//删除元素
	['a','b','c','b','b'] - ['b','c'] == ['a']
	['a','b','c','b','b'].remove('c');		//如果有元素被删除返回true，否则false

	![]		//true, 判空
	[].empty	//true,判空

	def list3 = list.clone();	//克隆一个list
	list3 == list;		//比较两个list，按元素比较

	[1, 2, 3].each {println "Item: $it" }	//遍历数组,循环数组
	['a', 'b', 'c'].eachWithIndex { it, i ->  println "$i: $it"}	//带索引遍历

	[1, 2, 3].find { it > 1 } == 2	//查找第一个符合条件的元素
	[1, 2, 3].findAll { it > 1 } == [2, 3]		//查找所有
	['a', 'b', 'c', 'd', 'e'].findIndexOf { it in ['c', 'e', 'g']} == 2;	//满足条件元素的索引
	['a', 'b', 'c', 'd', 'c'].indexOf('c') == 2
	['a', 'b', 'c', 'd', 'c'].indexOf('z') == -1	//-1表示元素不在list中
	['a', 'b', 'c', 'd', 'c'].lastIndexOf('c') == 4		//最后一个匹配元素

	[1, 2, 3].every { it < 5 }		//返回true/false, 所有元素满足条件
	[1, 2, 3].any { it > 2 }	

	[1, 2, 3, 4, 5, 6].sum() == 21 	//求和，对所有元素使用plus()方法
	['a', 'b', 'c', 'd', 'e'].sum() == 'abcde';
	['a', 'b', 'c', 'd', 'e'].sum { ((char) it) - ((char) 'a') } == 10;		//自定义求和方法
	[['a', 'b'], ['c', 'd']].sum() == ['a', 'b', 'c', 'd']	//合并数组

	[1, 2, 3].join('-') == '1-2-3';		//连接数组

	[9, 4, 2, 10, 5].max()==10;		//最大值
	['x', 'y', 'a', 'z'].min() == 'a'	
	['abc', 'z', 'xyzuvw', 'Hello', '321'].max { it.size() } == 'xyzuvw'	//自定义比较方法
	Comparator mc = { a, b -> a == b ? 0 : (a < b ? -1 : 1) };		//自定义比较方法	
	def list = [7, 4, 9, -6, -1, 11, 2, 3, -9, 5, -13];
	assert list.max(mc) == 11;

	'a' in ['a','b','c'];	//元素包含，返true/false
	['a','b','c'].contains('a')
	[1,3,4].containsAll([1,4])		//全部包含
	[1,2,3,3,3,3,4,5].count(3) == 4;	//统计
	[1,2,3,3,3,3,4,5].count { it%2==0} == 2;	//自定义统计方法

	[6, 3, 9, 2, 7, 1, 5].sort() == [1, 2, 3, 5, 6, 7, 9]	//排序
	['abc', 'z', 'xyzuvw', 'Hello', '321'].sort {it.size()} == ['z', 'abc', '321', 'Hello', 'xyzuvw'];	//自定义排序
	[7,4,-6,-9,5,-13].sort { a, b -> a == b ? 0 : Math.abs(a) < Math.abs(b) ? -1 : 1 } //自定义排序，（如比较绝对值）

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


## [操作文件](http://docs.groovy-lang.org/latest/html/groovy-jdk/java/io/File.html)
	//API详解见链接也页上部
	def targetFile = new File(fileName) //创建file对象
### [读文件](http://docs.groovy-lang.org/latest/html/groovy-jdk/java/io/InputStream.html)
	new File(baseDir, 'haiku.txt').eachLine { line -> println line };	//读出所有行
	new File(baseDir, 'haiku.txt').eachLine { line, nb -> println "Line $nb: $line" }	//行号
	def list = new File(baseDir, 'haiku.txt').collect {it}	//返回list
	byte[] contents = file.getBytes();	//读取字节
	
### [写文件](http://docs.groovy-lang.org/latest/html/groovy-jdk/java/io/File.html)
	targetFile.append(Object text, String charset)    //尾部追加，不存在则创建
	targetFile.write(String text)   
	targetFile.write(String text, String charset)

### [遍历文件树/文件夹](http://docs.groovy-lang.org/latest/html/groovy-jdk/java/io/File.html)
	def dir = new File(folderName);
	dir.eachFile { file -> println file.name};	//文件和文件夹，非递归
	dir.eachFileMatch(~/.*\.txt/) { file ->println file.name };	//非递归
	
	dir.eachFileRecurse { file ->println file.name };	//递归
	dir.eachFileRecurse(FileType.FILES) { file ->println file.name };	//只文件，递归	
	
### 终止遍历
	dir.traverse { file ->
		if (file.directory && file.name=='bin') {
			FileVisitResult.TERMINATE                   
		} else {
			println file.name
			FileVisitResult.CONTINUE;                    
		}
	}

## [操作xml](http://groovy-lang.org/search.html)
	//创建xml
	import groovy.xml.*
	def st = new StringWriter()
	MarkupBuilder mb  = new MarkupBuilder(st);
	mb.feed{
		entry(id:"1234567"){
			title{
			 show(name:"1234","fdfsa")
			}
			 link:"readf"
		}
	}
	print st

	//解析xml
	//XmlParser 支持xml文档的GPath表达式，支持findAll、find的查找方式
	//XmlSlurper  类似XmlParser，懒加载方式
	//DOMCategory 用一些语法支持DOM的底层解析
	def xmlSource = new File('xmllocation')
	def slurper= new XmlSlurper().parse(xmlSource)
	println  result.person*.city    //result.person我们会得到多个节点，这时候使用列表操作符*.可以对多个节点收集信息并返回为一个集合
	println  result.person*.@name   //@--获取对应属性的值

	def result = xml.parse(new File("C:/Users/xiaonanzhi/Person.xml"))
	result.person.find{it->
	 if(it.@name == "xiao5"){
	 println it.link.@rel
	 }
	}
	
	
## [调用shell/cmd指令](http://groovy-lang.org/groovy-dev-kit.html#_reading_files)
	//只用Process对象
	def process = "ls -l".execute();	println "Found text ${process.text}" ;
	def process = "ls -l".execute();process.in.eachLine { line ->println line};



## java<-->groovy互相调用  
	//groovy<--java
		import java.sql.Date;
		Date xx = new Date();
	
	//java<--groovy
	//Test.java
		Test test = new Test();
		String[] roots = new String[]{"files/"};	//指定groovy脚本加载目录
		GroovyScriptEngine groovyScriptEngine = new GroovyScriptEngine(roots); //groovy引擎
		Class scriptClass = groovyScriptEngine.loadScriptByName("exp.groovy");	//加載腳本
		GroovyObject scriptInstance = (GroovyObject)scriptClass.newInstance();	//實例化腳本
		//調用方法，傳入參數
		Test ret = (Test)scriptInstance.invokeMethod("helloWithParam",new Object[]{test,100});
		System.out.println(ret.getAge());
	//exp.groovy
		def helloWithParam(person, age){
			person.age = age;
			return person;
		}
	
	//groovy<--groovy
	    String[] roots = new String[]{"files/"};    //指定groovy脚本加载目录
	    GroovyScriptEngine groovyScriptEngine = new GroovyScriptEngine(roots); //groovy引擎
	    Class scriptClass = groovyScriptEngine.loadScriptByName("exp.groovy");  //加載腳本
	    Binding binding = newBinding();   //脚本中变量入参
	    binding.setVariable("name", "zhousahjkshdkajs");  //设置变量值
	    Object output = groovyScriptEngine.run("hello.groovy", binding);
	//hello.groovy
		return "in param name is ${name}"


## 包 
	//默认导入
	java.io.*
	java.lang.*
	java.math.BigDecimal
	java.math.BigInteger
	java.net.*
	java.util.*
	groovy.lang.*
	groovy.util.*
	
	//引入jar包
	*.groovy中加入 import java.math.* 即可！

## 配置  
	1、下载apache-groovy-sdk-2.4.7.zip --> 环境变量：GROOVY_HOME=G:\program-my\groovy-2.4.7 ， path添加：%GROOVY_HOME%/bin; 
	2、测试 groovy -version 
	        groovyconsole.bat //grrovy控制台，运行Ctrl+R (view中可去掉 show script in output)
	3、groovyc hello.groovy //编译[可免] ;  groovy hello.groovy

# eclipse
## 快捷键 
	Alt+Shift+B 打开面包屑视图，展示当天文件的路径（重要）  
	Ctrl+Shift+G  展示调用当前方法的所有类（鼠标定位到这个方法） 
	Ctrl+T / F4  当前接口的所有实现类
	Ctrl+Shift+O 删除unuse的包
	Alt+Shift+R  统一修改参数名字/类变量、 方法变量等  
	Ctrl+E/Ctrl+F6 展示当前已打开的所有文件  
	Alt+Shift+->  范围选取  
	Ctrl+Shift+P  跳到对应的大括号处  
	Alt+Shift+M   抽取子方法（先选中代码块)  
	Ctrl+Shift+Y/X  选中字符转大小写  
	Ctrl+K/Ctrl+Shift+K 向下/向上查找  
	Ctrl+L  跳转指定行  
	Ctrl+T 搜索class  
	Ctrl+R 搜索java文件  
	Ctrl+D  删除当前行  
	Ctrl+o  当前文件的属性和方法  
	Ctrl+H  搜索  
	eclispe各种视图 -->Window-->Showview-->Other  

## 插件  
	1) 在线安装：eclipse-->help-->marketpalce
	   离线：插件jar包放在eclipse下plugin目录
	2) 打开文件文件： Open Explorer (市场中名字eclispe explorer)

## 配置 
	1)[关闭变量名后自动补全类型字符](http://www.itnose.net/detail/6143864.html)  
	2)Ctrl+S时自动格式化代码，删除unuse的包:  
		windows->preference->java/Editor/Save action->勾选Format source Code, Organize import  
	3)设置默认编码 
		Window->Preferences->General->Workspace->Text file encoding 选择UTF-8  
	4) 设置tab键为4个空格
		window->preference->General->Editors->Text Editors,选中右侧的 insert space for tabs;

## 远程debug
	下一个断点: F8  单步： F6	  进入： F5  
	查看变量：　debug视图--》 Variables --> 变量名--》voProperties --> properties -->table即可  
	
	--》打开远程debug： debug图标 --> debug configuration -->  Remote java Application --》 配置地址端口--》 勾选"Allow termination of remote VM"
	--》 查看debug远程端口：  /home/business/opt/container/bin/catalina.sh -->  搜索 Xdebug --》（常用:8090）
	     JAVA_OPTS="$JAVA_OPTS -Xdebug -Xrunjdwp:transport=dt_socket,address=5889,server=y,suspend=n" 
	-->打开debug视图 --》 右上角 open persperctive --> debug
    
# maven
## 安装
	注：下载后解压即可(先安装jdk), 升级下载最新包，修改M2_HOME值即可
	1.“系统变量”中增加变量 M2_HOME , 值 H:\program\apache-maven-3.2.3 （Maven的安装路径）。 
	2.“ 系统变量”Path中末尾加 %M2_HOME%\bin;	
	//测试安装成功
	echo %M2_HOME%		//变量是否指向了正确的安装目录
	mvn  -v			//能否正确找到mvn的执行脚本
	
	//IDE中配置maven
	window-->preference-->搜索maven-->Installations-->add

## 基础问题 
	1、pom.xml总是在项目的根目录。
	2、约定优于配置：
			源码目录为 src/main/java
			编译输出目录为 target/classes/
			打包方式默认为jar(如果不指定packaging标签的话)
			包输出目录为target
	3、maven中通过groupId、artifactId、version定位到一个唯一jar、pom、car。
	4、Maven所需构件都是直接从本地仓库获取的。如果本地没有，会尝试从远程仓库下载构件至本地仓库，然后再使用本地仓库的构件。
	5、maven指令
		//test前会自动compile，package前会自动test，install前会自动package
		mvn clean compile   //编译
		mvn clean test
		mvn clean package   //打包（成jar后war）
		mvn clean install   //将工程打出的包安装到本地仓库

## pom.xml解析  
	<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	  <modelVersion>4.0.0</modelVersion>	//当前pom模型的版本，3.0必须是4.0.0
	  <groupId>com.huawei</groupId>		//必须，项目属于哪个组，一般值项目关联的组织/公司
	  <artifactId>ttt</artifactId>		//必须，项目在组中唯一的id
	  <version>0.0.1-SNAPSHOT</version>	//必须，项目当前版本(snapchat-快照，开发中非稳定版本)
	  <packaging>war</packaging>	//可选，打包方式，默认jar
	  <name>Maven hello project</name>	//可选，对用户更友好的项目名称
	  
	  <dependencies>  
		<dependency>  
		    <groupId>org.springframework</groupId>  //必选
		    <artifactId>spring-core</artifactId>  //必选
		    <version>${springframework.version}</version	//必选  
		    <type>jar</type>   //可选，依赖类型，默认jar
		    //可选，依赖范围，默认compile-编译/测试/运行都需要；test-只测试需要；provided-编译测试；runtime-运行
		    <scope>compile</scope>  
		</dependency>  
	  </dependencies>  
	</project>

## 坐标和依赖
	//传递性依赖
	   例子：项目有Spring-aop:4.1.1.RELEASE的依赖，而Spring-aop也有自己的依赖（maven仓库中的pom.xml），maven会自动解析依赖获得依赖的包。
	//依赖冲突的处理
	   如果项目A有这样的依赖关系：A->B->C->X(1.0)、A->D->X(2.0), 这样依赖路径上有两个版本的X。原则如下：
	   1.路径最近者优先。如上1.0的路径长度是3，2.0的长度是2，则2.0的X会被使用。
	   2.路径长度相同时，第一声明者优先。即在pom.xml中使用先声明的那个。
	//排除依赖
	
	查看依赖信息
	   mvn dependency:tree 优先 --> 解析成依赖树，可以看出某个依赖是从哪个路径引入的。
	   mvn dependency:list 	--> 解析并显示依赖列表。 列出所有依赖的文件。

## [仓库](http://search.maven.org/)
    1、仓库搜索服务 --> http://search.maven.org/
    2、超级pom,中央仓库 ${M2_HOME}/lib/maven-model-builder-3.0.4.jar --> \org\apache\maven\model\pom-4.0.0.xml, 所有Maven POM的父POM
    3、//本地仓库（可从maven中复制一份到此处修改，不要修改全局的settings.xml）
        ~/.m2/settings.xml --> localRepository标签指定本地仓库地址
        
    4、//远程仓库（私服是一种特殊的远程仓库）可多个，pom.xml配置-单工程有效，settings.xml全部有效
      <repositories>  
    	<repository>  
    	  <id>cloudhopper</id>  
    	  <name>Repository for Cloudhopper</name>  
    	  <url>http://maven.cloudhopper.com/repos/third-party/</url>  //仓库地址，http协议
    	  <releases>       
    		<enabled>true</enabled>   //开启发布版本支持    
    	  </releases>       
    	  <snapshots>       
    		<enabled>false</enabled>  //不会下载快照版本(最新版)
    	  </snapshots>  
    	</repository>  
      </repositories>  

    5、镜像--一般用于代替中央仓库提供服务,一般公司内部有一个
    <mirrors>
      <mirror> 
    	<id>rnd-huawei</id> 
    	<name>ibiblio Mirror of http://repo1.maven.org/maven2/</name> 
    	<url>http://rnd-mirrors.hxxx.com/maven/</url>
    	<mirrorOf>central</mirrorOf> 
      </mirror>
    </mirrors>

## 其它  
	10、创建maven project：new project-->maven project --> 勾选"Create a simple project" 不使用骨架
	11、[创建webapp项目](http://jingyan.baidu.com/article/9f63fb91a7d2a5c8400f0e20.html)：
		先创建一个普通的maven project（package选war），src/main下面会生成webapp目录--> 工程 properties-->project facets -->java选中1.8
		-->Danamic web module取消，apply， 再勾选apply-->生成webContent目录-->将其下的MEATA_INF和WEB_INF复制到src/main/webapp下
		-->删掉webcontent-->
		修改发布规则-->工程 右键 properties --> Deployment Assembly -->测试目录不需发布可以去掉
						   --> 指定web路径-->add-->folder-->选中webapp目录
